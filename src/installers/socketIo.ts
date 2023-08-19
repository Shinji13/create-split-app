import path from "path";
import fsExtra from "fs-extra";
import { PackageJson } from "type-fest";
import { stackPackages } from "../types.js";
import { addDependency } from "../utils/addDependency.js";

export function socketIoInstaller(
  extraSrc: string,
  projectDirAbsolutePath: string,
  packages?: stackPackages[],
  noLib?: boolean
) {
  let socketsSrc = path.join(extraSrc, "sockets");
  let socketDist = path.join(projectDirAbsolutePath, "sockets");
  let svelteConfigSrc = path.join(extraSrc, "config/svelte.configExpress.js");
  let svelteConfigDist = path.join(projectDirAbsolutePath, "svelte.config.js");

  // ** updating package json
  // ** adding socket dependencies
  addDependency(
    ["socket.io", "socket.io-client", "express", "@sveltejs/adapter-node"],
    false,
    projectDirAbsolutePath
  );
  addDependency(
    ["@types/node", "@types/express"],
    true,
    projectDirAbsolutePath
  );

  // ** removing adapter auto
  const pkgJsonPath = path.join(projectDirAbsolutePath, "package.json");
  const pkgJson = fsExtra.readJSONSync(pkgJsonPath) as PackageJson;
  delete pkgJson.devDependencies["@sveltejs/adapter-auto"];
  fsExtra.writeJSONSync(pkgJsonPath, pkgJson);

  // ** copy sockets folder
  fsExtra.copySync(socketsSrc, socketDist);

  // ** writing svelte config for node adapter
  fsExtra.copyFileSync(svelteConfigSrc, svelteConfigDist);
}
