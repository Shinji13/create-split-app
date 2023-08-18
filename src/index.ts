import { Cli } from "./cli/index.js";
import { welcome } from "./utils/welcome.js";

async function main() {
  const projectDir = process.cwd();
  welcome();
  const cliSettings = await Cli();
}

main();
