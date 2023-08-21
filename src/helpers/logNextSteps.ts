import { gitInitStatus, stackPackages, utilityFlags } from "../types.js";
import { logger } from "../utils/logger.js";
import { getUserPkgManager } from "../utils/userPackageManger.js";

export function logNextSteps(
  noInstall: boolean,
  packages: stackPackages[],
  projectDir: string,
  gitStatus: gitInitStatus
) {
  const pkgManager = getUserPkgManager();
  const hadPrimsa = packages.includes("prisma");
  logger.success("what to do next?");
  if (projectDir != ".") logger.info(`cd ${projectDir}`);
  if (!hadPrimsa && packages.includes("lucia"))
    logger.info("add a database adapter to your lucia config");
  if (hadPrimsa) {
    pkgManager == "npm"
      ? logger.info("npx prisma db push")
      : logger.info(`${pkgManager} prisma db push`);
  }
  if (noInstall) logger.info(`${pkgManager} install`);
  logger.info(`${pkgManager} run dev`);
  showGitSteps(gitStatus);
}

function showGitSteps(status: gitInitStatus) {
  const defaultLog = () => {
    logger.info("git init");
    logger.info("git add .");
    logger.info("git commit -m 'intail commit' ");
  };
  switch (status) {
    case "aborted":
      logger.info("git add .");
      logger.info("git commit -m 'new content' ");
      break;
    case "succeed":
      logger.info("git commit -m 'intail commit' ");
      break;
    case "restricted":
      logger.info(
        "move the project to another workspace to prevent git conflicts"
      );
      defaultLog();
      break;
    case "failed":
      logger.info("install git");
      defaultLog();
      break;
    case "ignore":
      defaultLog();
      break;
  }
}
