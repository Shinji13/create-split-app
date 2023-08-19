import path from "path";
import chalk from "chalk";
import fsExtra from "fs-extra";
import inquirer from "inquirer";
import ora from "ora";
import { PKG_ROOT } from "../consts.js";

export async function createBaseProject(
  projectDir: string,
  projectDirAbsolutePath: string
) {
  const srcDir = path.join(PKG_ROOT, "template/base");
  const doesItExist = fsExtra.existsSync(projectDirAbsolutePath);
  const spinner = ora(
    `creating base project in ${chalk.blue.bold(projectDirAbsolutePath)}`
  ).start();
  if (doesItExist) {
    if (fsExtra.readdirSync(projectDirAbsolutePath).length == 0) {
      spinner.info(
        `${chalk.blue.bold(projectDir)} exists but empty continuing...`
      );
    } else {
      spinner.stopAndPersist();
      const writingOption = await exitingDirPrompt();
      if (writingOption == "Abort") {
        spinner.fail("aborting installation...");
        process.exit(0);
      } else if (writingOption == "Clear") {
        spinner.info(`Very well clearing ${chalk.blue.bold(projectDir)}`);
        fsExtra.emptyDirSync(projectDirAbsolutePath);
      }
    }
  }
  spinner.start();
  fsExtra.copySync(srcDir, projectDirAbsolutePath);
  spinner.succeed(`now ${chalk.blue.bold(projectDir)} has base project setup `);
}

async function exitingDirPrompt() {
  const { writingOption } = await inquirer.prompt<{
    writingOption: "Abort" | "Clear" | "Overwrite";
  }>({
    name: "writingOption",
    message:
      "A directory with same path already exits what you want split to do?",
    type: "list",
    choices: [
      {
        name: "Abort the installation (recommanded)",
        value: "Abort",
      },
      {
        name: "Clear the directory and install",
        value: "Clear",
      },
      {
        name: "Overwrite existing files",
        value: "Overwrite",
      },
    ],
    default: "Abort",
  });
  return writingOption;
}
