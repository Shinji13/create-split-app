# create-split-app

## 2.1.0

### Minor Changes

- 3e1a74e: updating project template by removing controllers and routes folders from express-socketIo setup because we mainly use express only when intergating sockets.

## 2.0.0

### Major Changes

- adding two functions one to handle npm emitting .gitignore and .npmrc from base directory by default they have random names then this function rename them at run time to appropriate names second function however handles removing .placeholder files that been putting because of npm not publishing empty folders and lastly changing main +page.svelte to have a logo instead of a header and this is the standard version.

## 1.2.0

### Minor Changes

- adding base ignore file and npmrc to prevent excluding them and adding placeholder files to prevent removing them during publishing by npm

### Patch Changes

- Updated dependencies
  - create-split-app@1.2.0

## 1.1.0

### Minor Changes

- i replaced .npmignore with files property in package.json to ensure including all files from template and dist folders

### Patch Changes

- Updated dependencies
  - create-split-app@1.1.0
