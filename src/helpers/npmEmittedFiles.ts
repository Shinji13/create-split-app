import fsExtra from "fs-extra";
import path from "path";

export function renameEmittedFiles(projectDirFullPath: string) {
  // this is added because npm ignores .npmrc .gitignore files when publishing
  // ** adding .gitignore
  let oldGitIgnorePath = path.join(projectDirFullPath, "_gitignore");
  let newGitIgnorePath = path.join(projectDirFullPath, ".gitignore");
  fsExtra.renameSync(oldGitIgnorePath, newGitIgnorePath);

  // ** adding .npmrc
  let oldNpmrcPath = path.join(projectDirFullPath, "_npmrc");
  let newNpmrcPath = path.join(projectDirFullPath, ".npmrc");
  fsExtra.renameSync(oldNpmrcPath, newNpmrcPath);
}
