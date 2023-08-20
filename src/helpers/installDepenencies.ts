import { execa } from "execa";
import ora from "ora";
import { getUserPkgManager } from "../utils/userPackageManger.js";

export async function installDependencies(projectDirAbsolutePath: string) {
  const packageManager = getUserPkgManager();
  const spinner = ora(`Running ${packageManager} install...`).start();
  const childProcess = execa(packageManager, ["install"], {
    cwd: projectDirAbsolutePath,
  });
  await new Promise((res, rej) => {
    let error = "";
    childProcess.stderr.on("data", (data: Buffer) => {
      error += data.toString();
    });
    childProcess.on("close", (code) => {
      if (code == 0) {
        spinner.succeed("successfully installing packages");
        res("");
      } else rej(error);
    });
    childProcess.on("error", (e) => rej(e));
  });
}
