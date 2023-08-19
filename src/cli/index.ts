import { Command } from "commander";
import inquirer from "inquirer";
import {
  defaultPackages,
  defaultProjectName,
  stackPackages,
  stackPackagesArray,
  title,
} from "../consts.js";
import { getPackageVersion } from "../utils/gettingPackageVersion.js";
import { logger } from "../utils/logger.js";
import { getUserPkgManager } from "../utils/userPackageManger.js";
import { validateProjectName } from "../utils/validateName.js";

interface cliSettings {
  projectName: string;
  packages: stackPackages[];
  flags: {
    default: boolean;
    CI: boolean;
    noGit: boolean;
    noInstall: boolean;
    noLib: boolean;
    prisma: boolean;
    lucia: boolean;
    zod: boolean;
    tailwind: boolean;
    socketIo: boolean;
  };
}

const defaultSettings: cliSettings = {
  projectName: defaultProjectName,
  flags: {
    default: false,
    CI: false,
    noGit: false,
    noInstall: false,
    noLib: false,
    prisma: false,
    lucia: false,
    zod: false,
    tailwind: false,
    socketIo: false,
  },
  packages: defaultPackages,
};

export async function Cli() {
  const settings = defaultSettings;
  const core = new Command().name(title);
  core
    .description("A cli tool to spin web project using split stack")
    .version(getPackageVersion(), "--v", "getting the version of the package")
    .argument("[projectName]", "Project name as well as directory name")
    .option(
      "--default",
      "This flag determines whether we use default options to spin up the project",
      false
    )
    .option(
      "--CI",
      "This flag must be set if you want to set packages without going to interactive mode",
      false
    )
    .option(
      "--noGit",
      "This flag determines whether we initialize a git repository or not",
      false
    )
    .option(
      "--noLib",
      "This flag determines whether we add split's lib folder structure or not",
      false
    )
    .option(
      "--noInstall",
      "This flag determines og to install packages after project setup or not",
      false
    )
    // --CI flag must be set otherwise we prompt the user of options
    .option(
      "--prisma",
      "This flag determines whether we install prisma or not",
      false
    )
    // --CI flag must be set otherwise we prompt the user of options
    .option(
      "--tailwind",
      "This flag determines whether we install tailwind or not",
      false
    )
    // --CI flag must be set otherwise we prompt the user of options
    .option(
      "--zod",
      "This flag determines whether we install zod or not",
      false
    )
    // --CI flag must be set otherwise we prompt the user of options
    .option(
      "--socketIo",
      "This flag determines whether we install socketio or not",
      false
    )
    // --CI flag must be set otherwise we prompt the user of options
    .option(
      "--lucia",
      "This flag determines whether we install lucia or not",
      false
    )
    .parse(process.argv);

  if (core.args[0]) settings.projectName = core.args[0];
  // copying flags from the call to cliOption
  settings.flags = core.opts();

  //setting packges using flags if ci mode is on
  if (settings.flags.CI) {
    settings.packages = [];
    stackPackagesArray.forEach((el) => {
      if (settings.flags[`${el}`]) settings.packages.push(el);
    });
  }
  if (settings.flags.CI || settings.flags.default) return settings;

  try {
    settings.packages = await packagesPrompt();
    if (!core.args[0]) settings.projectName = await namePrompt();
    const isUsingSocket = await socketIoPrompt();
    if (isUsingSocket) settings.packages.push("socketIo");
    if (!settings.flags.noGit) settings.flags.noGit = await gitPrompt();
    if (!settings.flags.noLib) settings.flags.noLib = await libPrompt();
    if (!settings.flags.noInstall)
      settings.flags.noInstall = await installPrompt();
  } catch (error) {
    if (error.isTtyError) {
      logger.warn("it seems you are using non interactive terminal");
      const useDefault: boolean = await defaultProjectPrompt();
      if (!useDefault) process.exit(0);
    } else {
      logger.error(JSON.stringify(error));
      process.exit(1);
    }
  } finally {
    return settings;
  }
}

export const packagesPrompt = async () => {
  const { packages } = await inquirer.prompt({
    name: "packages",
    message: "Select packages you want to use",
    type: "checkbox",
    choices: defaultPackages.map((el) => ({ checked: false, name: el })),
  });
  return packages;
};

export const libPrompt = async () => {
  const { isLib } = await inquirer.prompt({
    name: "isLib",
    type: "confirm",
    default: true,
    message:
      "Do you want to use split lib folder structure that provides a good way of handling shared dependencies  ?",
  });

  if (isLib) logger.success("Fantastic copying the split stack lib folder");
  else logger.info("Okay you still can check split stack documentation.");
  return isLib;
};
export const gitPrompt = async () => {
  const { isGit } = await inquirer.prompt({
    name: "isGit",
    type: "confirm",
    default: true,
    message: "Do you want split to initialize git repository for you?",
  });
  if (isGit) logger.success("Alright initializing a git repository");
  else logger.info("Sounds good ,you can run git init later.");
  return isGit;
};
export const installPrompt = async () => {
  const { isInstall } = await inquirer.prompt({
    name: "isInstall",
    type: "confirm",
    default: true,
    message: "Do you want to use split to install packages for you?",
  });
  const pkgManager = getUserPkgManager();
  if (isInstall) logger.success("Well done installing packages.");
  else if (pkgManager == "yarn") {
    logger.info(`No problem you can run ${getUserPkgManager()}`);
  } else logger.info(`No problem you can run ${getUserPkgManager()} install`);
  return isInstall;
};
export const namePrompt = async () => {
  const { projectName } = await inquirer.prompt({
    name: "projectName",
    type: "input",
    message: "Enter your project name that will also be your directory name",
    default: title,
    validate: validateProjectName,
    transformer: (name: string) => name.trim(),
  });
  return projectName;
};

export const defaultProjectPrompt = async () => {
  const { useDefault } = await inquirer.prompt({
    type: "confirm",
    default: true,
    message: "Do you want to use default project setup?",
    name: "useDefault",
  });
  if (useDefault) logger.success("perfect spining up default project template");
  else logger.info("exiting now");
  return useDefault;
};
export const socketIoPrompt = async () => {
  const { isUsingSocket } = await inquirer.prompt({
    name: "isUsingSocket",
    message:
      "Do you want to add socketio setup to you project through express server?",
    type: "confirm",
    default: false,
  });
  if (isUsingSocket) logger.success("Very well setting up socketIo.");
  else logger.info("Sure sockets are not needed.");
  return isUsingSocket;
};
