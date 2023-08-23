import fsExtra from "fs-extra";
import { placeHolderPaths } from "../consts.js";
import path from "path";

export function removePlaceHoldersFiles(projectDirAbsolutePath: string) {
  placeHolderPaths.forEach((basePath) => {
    let currentFileFullPath = path.join(
      projectDirAbsolutePath,
      basePath,
      ".placeholder"
    );
    fsExtra.removeSync(currentFileFullPath);
  });
}
