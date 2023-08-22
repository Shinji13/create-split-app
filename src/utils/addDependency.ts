import path from "path";
import fsExtra from "fs-extra";
import { PackageJson } from "type-fest";
import { dependencyMap } from "../installers/dependencyMap.js";
import { availablePackage } from "../types.js";

export function addDependency(
  dependencies: availablePackage[],
  devMode: boolean,
  projectDirAbsolutePath: string
) {
  let pkgJsonPath = path.join(projectDirAbsolutePath, "package.json");
  let pkgJson = fsExtra.readJsonSync(pkgJsonPath) as PackageJson;
  for (let dependency of dependencies) {
    if (devMode) {
      pkgJson.devDependencies[dependency] = dependencyMap[dependency];
    } else {
      pkgJson.dependencies[dependency] = dependencyMap[dependency];
    }
  }
  fsExtra.writeJSONSync(pkgJsonPath, pkgJson);
}
