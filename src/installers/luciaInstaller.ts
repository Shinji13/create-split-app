import path from "path";
import fsExtra from "fs-extra";
import { stackPackages } from "../types.js";
import { addDependency } from "../utils/addDependency.js";

export function luciaInstaller(
  extraSrc: string,
  projectDirAbsolutePath: string,
  packages?: stackPackages[],
  noLib?: boolean
) {
  let luciaConfigSrc = packages.includes("prisma")
    ? path.join(extraSrc, "auth/luciaPrisma.ts")
    : path.join(extraSrc, "auth/lucia.ts");
  let luciaConfigDist = noLib
    ? path.join(projectDirAbsolutePath, "src/lib/server/lucia.ts")
    : path.join(projectDirAbsolutePath, "src/lib/server/config/lucia.ts");
  let appTypesSrc = path.join(extraSrc, "auth/app.d.ts");
  let appTypesDist = path.join(projectDirAbsolutePath, "src/app.d.ts");
  let hookLuciaSrc = path.join(extraSrc, "hooks/hooks.server.ts");
  let hookLuciaDist = path.join(projectDirAbsolutePath, "src/hooks.server.ts");
  // ** updating package json
  // ** adding lucia config
  addDependency(["lucia"], false, projectDirAbsolutePath);
  if (packages.includes("prisma"))
    addDependency(
      ["@lucia-auth/adapter-prisma"],
      false,
      projectDirAbsolutePath
    );

  // ** writing lucia config
  fsExtra.copyFileSync(luciaConfigSrc, luciaConfigDist);
  // ** writing app.d.ts for lucia types
  fsExtra.copyFileSync(appTypesSrc, appTypesDist);
  // ** writing hooks file to handle lucia session
  fsExtra.copyFileSync(hookLuciaSrc, hookLuciaDist);
}
