#!/usr/bin/env node
import path from "path";
import fsExtra from "fs-extra";
import { PackageJson } from "type-fest";
import { Cli } from "./cli/index.js";
import { createProject } from "./helpers/createProject.js";
import { setupGit } from "./helpers/git.js";
import { installDependencies } from "./helpers/installDepenencies.js";
import { logNextSteps } from "./helpers/logNextSteps.js";
import { gitInitStatus } from "./types.js";
import { logger } from "./utils/logger.js";
import { parsePath } from "./utils/parsePath.js";
import { removePackagesFlags } from "./utils/removePackagesFlags.js";
import { welcome } from "./utils/welcome.js";

async function main() {
  welcome();
  const cliSettings = await Cli();
  const utilityFlags = removePackagesFlags(cliSettings.flags);
  const [projectName, projectDir] = parsePath(cliSettings.userNameInput);
  // ** setting up the project folder
  const projectDirAbsolutePath = await createProject(
    utilityFlags.noLib,
    cliSettings.packages,
    projectDir
  );
  // ** update package name
  const pkgJsonPath = path.join(projectDirAbsolutePath, "package.json");
  const pkgJson = fsExtra.readJSONSync(pkgJsonPath) as PackageJson;
  pkgJson.name = projectName;
  fsExtra.writeJSONSync(pkgJsonPath, pkgJson, { spaces: 2 });

  // ** installing packages
  if (!utilityFlags.noInstall) {
    await installDependencies(projectDirAbsolutePath);
  }

  // ** git setup
  let status: gitInitStatus = "ignore";
  if (!utilityFlags.noGit)
    status = await setupGit(projectDirAbsolutePath, projectName);

  // ** what next
  logNextSteps(
    utilityFlags.noInstall,
    cliSettings.packages,
    projectDir,
    status
  );
}

main().catch((err) => {
  logger.error("\nAborting installation...\n");
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error(
      "An unknown error has occurred. Please open an issue on github with the below:"
    );
    console.log(err);
  }
  process.exit(1);
});
