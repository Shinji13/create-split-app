import { stackPackages, utilityFlags } from "../types.js";
import { logger } from "../utils/logger.js";
import { getUserPkgManager } from "../utils/userPackageManger.js";

export function logNextSteps(
  flags: utilityFlags,
  packages: stackPackages[],
  projectDir: string
) {
  const pkgManager = getUserPkgManager();
  const hadPrimsa = packages.includes("prisma");
  logger.info("what to do next?");
  if (projectDir != ".") logger.info(`cd ${projectDir}`);
  if (!hadPrimsa && packages.includes("lucia"))
    logger.info("add a database adapter to your lucia config");
  if (hadPrimsa) {
    pkgManager == "npm"
      ? logger.info("npx prisma db push")
      : logger.info(`${pkgManager} prisma db push`);
  }
  if (flags.noInstall) logger.info(`${pkgManager} install`);
  logger.info(`${pkgManager} run dev`);
  // ! take in consideration parent repo
  if (flags.noGit) logger.info("git init");
  logger.info("git add .");
  logger.info("git commit -m 'intail commit' ");
}
