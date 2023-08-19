import { Cli } from "./cli/index.js";
import { createProject } from "./helpers/createProject.js";
import { parsePath } from "./utils/parsePath.js";
import { removePackagesFlags } from "./utils/removePackagesFlags.js";
import { welcome } from "./utils/welcome.js";

async function main() {
  welcome();
  const cliSettings = await Cli();
  const utilityFlags = removePackagesFlags(cliSettings.flags);
  const [projectName, projectDir] = parsePath(cliSettings.userNameInput);
  createProject(utilityFlags.noLib, cliSettings.packages, projectDir);
}

main();
