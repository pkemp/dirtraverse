import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
const lstat = util.promisify(fs.lstat);
const readdir = util.promisify(fs.readdir);

/**
 * Traverse directory and call a callback with each file/folder. If callback return true for a folder, it's content will be skipped.
 *
 * ### Example
 * ```js
 * const dirtraverse = require('@pkemp/dirtraverse');
 *
 * dirtraverse.traverse('.', (err, filepath, stats) => {
 *  console.log('Callback called with path: ', filepath);
 *   return stats.isDirectory() && path.basename(filepath) === '.git'	// return true if you want to skip traversal of a subfolder
 * });
 * ```
 *
 * @param filepath Path to the folder for starting point.
 * @param callback The callback is called with each folder and file. In case of error the err is not null.
 * @returns Promise<void>
 */
export async function traverse(filepath: string, callback: (err: Error, filepath: string, stats: fs.Stats) => boolean): Promise<void> {
	try {
		const stats = await lstat(filepath);
		if (stats.isFile()) {
			callback(null, filepath, stats);
		} else if (stats.isDirectory()) {
			if (!callback(null, filepath, stats)) {
				try {
					const files = await readdir(filepath);
					for (let i = 0; i < files.length; i++) {
						const file = path.join(filepath, files[i]);
						await traverse(file, callback);
					}
				} catch (err) {
					callback(err, filepath, stats);
				}
			}
		}
	} catch (err) {
		callback(err, filepath, null);
	}
}
