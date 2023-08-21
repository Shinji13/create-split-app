import path from "path";
import { execaSync } from "execa";
import fsExtra from "fs-extra";
import inquirer from "inquirer";
import ora from "ora";
import { gitInitStatus } from "../types.js";

function isGitInstalled(dir: string) {
  try {
    execaSync("git --version", {
      cwd: dir,
      stdout: "ignore",
    });
    return true;
  } catch (error) {
    return false;
  }
}

function isInsideRepo(dir: string) {
  try {
    execaSync("git", ["rev-parse", "--is-inside-work-tree"], {
      cwd: dir,
      stdout: "ignore",
    });
    return true;
  } catch (error) {
    return false;
  }
}

function isRootDir(dir: string) {
  const gitPath = path.join(dir, ".git");
  const exists = fsExtra.existsSync(gitPath);
  return exists;
}

export async function setupGit(
  projectDirFullPath: string,
  projectName: string
): Promise<gitInitStatus> {
  const spinner = ora("starting git intialiazation").start();
  if (!isGitInstalled(projectDirFullPath)) {
    spinner.warn(
      "git is not installed on the system , skiping git intialization"
    );
    return "failed";
  }
  const isRoot = isRootDir(projectDirFullPath);
  const isInside = isInsideRepo(projectDirFullPath);
  // ** project dir has git subdir => prompt user for init
  if (isRoot) {
    spinner.stopAndPersist();
    const { reInit } = await inquirer.prompt({
      name: "reInit",
      message: `do you want to re-intailize git repo in ${projectName}`,
      type: "confirm",
      default: false,
    });
    if (!reInit) {
      spinner.info("aborting intailiazation");
      return "aborted";
    }
  }
  // ** project dir is inside parent directory that contains git subdir
  else if (isInside && !isRoot) {
    spinner.warn(
      `${projectName} is already in work tree you need to consider moving the project to different workspace`
    );
    return "restricted";
  }
  // ** in case we prompt the user for re-init and he accepted
  if (!spinner.isSpinning) spinner.start();
  execaSync("git", ["init"], { cwd: projectDirFullPath });
  execaSync("git", ["add", "."], { cwd: projectDirFullPath });
  spinner.succeed("intailizing git repository was successful");
  return "succeed";
}
