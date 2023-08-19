import { stackPackages } from "../types.js";
import { addDependency } from "../utils/addDependency.js";

export function zodInstaller(
  extraSrc: string,
  projectDirAbsolutePath: string,
  packages?: stackPackages[],
  noLib?: boolean
) {
  // ** updating package json
  // ** adding zod
  addDependency(["zod"], false, projectDirAbsolutePath);
}
