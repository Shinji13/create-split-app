import path from "path";
import fsExtra from "fs-extra";
import { stackPackages } from "../types.js";
import { addDependency } from "../utils/addDependency.js";

export function prismaInstaller(
  extraSrc: string,
  projectDirAbsolutePath: string,
  packages?: stackPackages[],
  noLib?: boolean
) {
  let prismaConfigSrc = path.join(extraSrc, "prisma/prisma.ts");
  let prismaConfigDist = noLib
    ? path.join(projectDirAbsolutePath, "src/lib/server/prisma.ts")
    : path.join(projectDirAbsolutePath, "src/lib/server/config/prisma.ts");
  let prismaSchemaSrc = packages.includes("lucia")
    ? path.join(extraSrc, "prisma/BasicLucia.prisma")
    : path.join(extraSrc, "prisma/base.prisma");
  let prismaSchemaDist = path.join(
    projectDirAbsolutePath,
    "prisma/schema.prisma"
  );

  // ** updating package json
  // ** adding prisma config
  addDependency(["prisma"], true, projectDirAbsolutePath);
  addDependency(["@prisma/client"], false, projectDirAbsolutePath);

  // ** creating prisma directory
  fsExtra.ensureDirSync(path.join(prismaSchemaDist, "../"));

  // ** writing prisma config
  fsExtra.copyFileSync(prismaConfigSrc, prismaConfigDist);

  // ** writing prisma schema
  fsExtra.copyFileSync(prismaSchemaSrc, prismaSchemaDist);
}
