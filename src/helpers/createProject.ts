import path from "path";
import fsExtra from "fs-extra";
import ora from "ora";
import { PKG_ROOT } from "../consts.js";
import { stackPackages } from "../types.js";
import { createBaseProject } from "./createBaseProject.js";
import { installer } from "./installer.js";
import { renameEmittedFiles } from "./npmEmittedFiles.js";
import { removePlaceHoldersFiles } from "../helpers/removePlaceHolders.js";
export async function createProject(
  noLib: boolean,
  packages: stackPackages[],
  projectDir: string
) {
  const workingDir = process.cwd();
  const projectDirAbsolutePath = path.resolve(workingDir, projectDir);
  // ** first step creating base project
  await createBaseProject(projectDir, projectDirAbsolutePath);
  // ** rename .gitignore and .npmrc
  renameEmittedFiles(projectDirAbsolutePath);
  const extraSrc = path.join(PKG_ROOT, "template/extra");
  // ** copying splits convention lib folder if flag is set
  if (!noLib) {
    const spinner = ora("Setting up split's lib folder structure...").start();
    const libFolderSrc = path.join(extraSrc, "lib");
    const libFolderDist = path.join(projectDirAbsolutePath, "src/lib");
    fsExtra.copySync(libFolderSrc, libFolderDist);
    spinner.succeed("Setting lib folder was successfull");
  }
  // ** setting up installers
  installer(packages, projectDirAbsolutePath, noLib, extraSrc);
  // ** remove placeholder files after adding lib
  removePlaceHoldersFiles(projectDirAbsolutePath);
  return projectDirAbsolutePath;
}
