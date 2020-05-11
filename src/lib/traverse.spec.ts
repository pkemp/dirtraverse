import test from 'ava';
import { traverse } from './traverse';

test('Test file stats', async t => {
	let fileTestCount = 0;
	await traverse('src', (_err, file, stats) => {
		if (file === 'src') {
			fileTestCount++;
			t.true(stats.isDirectory(), 'src is a directory');
		} else if (file === 'src/index.ts') {
			fileTestCount++;
			t.true(stats.isFile(), 'src/index.ts is a file');
		}
		return false;
	});
	t.is(fileTestCount, 2);
});

test('Test skipped folder', async t => {
	let fileTestCount = 0;
	await traverse('src', (_err, file, _stats) => {
		let result = false;
		if (file === 'src/lib') {
			fileTestCount++;
			/* skip src/lib content */
			result = true;
		} else if (file === 'src/lib/traverse.ts') {
			fileTestCount++;
			t.fail('lib folder should be skipped');
		}
		return result;
	});
	t.is(fileTestCount, 1);
});

test('Test nonexisting folder error', async t => {
	await traverse('NONEXISTINGFOLDER', (err, _file, _stats) => {
		t.not(err, null);
		return false;
	});
});
