# Dirtraverse

Traverse directory and call a callback with each file/folder. If callback return true for a folder, it's content will be skipped.

## Example
```js
const dirtraverse = require('@pkemp/dirtraverse');

dirtraverse.traverse('.', (err, filepath, stats) => {
  console.log('Callback called with path: ', filepath);
  return stats.isDirectory() && path.basename(filepath) === '.git'	// return true if you want to skip traversal of a subfolder
});
```

See [API docs](https://pkemp.github.io/dirtraverse/) for more information.

## Thanks
 - [Typescript Starter](https://github.com/bitjson/typescript-starter) by Jason Dreyzehner
