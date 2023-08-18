import path from "path";
import fsExtra from "fs-extra";
import type { PackageJson } from "type-fest";
import { PKG_ROOT } from "../consts.js";

export function getPackageVersion() {
  const pkgJsonPath = path.join(PKG_ROOT, "package.json");
  const pkgJson = fsExtra.readJSONSync(pkgJsonPath) as PackageJson;
  if (pkgJson.version) return pkgJson.version;
  return "1.0.0";
}
