import path from "path";
import { stackPackages } from "../types.js";
import { getUserPkgManager } from "../utils/userPackageManger.js";
import { createBaseProject } from "./createBaseProject.js";

export function createProject(
  isLib: boolean,
  packages: stackPackages[],
  projectDir: string
) {
  const workingDir = process.cwd();
  const projectDirFullPath = path.resolve(workingDir, projectDir);
  // ** first step creating base project
  createBaseProject(projectDir, projectDirFullPath);
}
