import path from "path";
import fsExtra from "fs-extra";
import { PackageJson } from "type-fest";
import { stackPackages } from "../types.js";
import { addDependency } from "../utils/addDependency.js";

export function tailwindInstaller(
  extraSrc: string,
  projectDirAbsolutePath: string,
  packages?: stackPackages[],
  noLib?: boolean
) {
  let tailwindSrc = path.join(extraSrc, "config/tailwind.config.cjs");
  let postcssSrc = path.join(extraSrc, "config/postcss.config.cjs");
  let tailwindPrettierSrc = path.join(
    extraSrc,
    "config/.prettierrcTailwindConfig"
  );
  let tailwindDist = path.join(projectDirAbsolutePath, "tailwind.config.cjs");
  let postcssDist = path.join(projectDirAbsolutePath, "postcss.config.cjs");
  let tailwindPrettierDist = path.join(projectDirAbsolutePath, ".prettierrc");
  let tailwindCssSrc = path.join(extraSrc, "pages/tailwindAppCss.css");
  let tailwindCssDist = path.join(projectDirAbsolutePath, "src/app.css");
  // ** updating package json
  // ** adding tailwind dependencies
  addDependency(
    ["postcss", "tailwindcss", "prettier-plugin-tailwindcss", "autoprefixer"],
    true,
    projectDirAbsolutePath
  );

  // ** removing prettier plugin svelte
  const pkgJsonPath = path.join(projectDirAbsolutePath, "package.json");
  const pkgJson = fsExtra.readJSONSync(pkgJsonPath) as PackageJson;
  delete pkgJson.devDependencies["prettier-plugin-svelte"];
  fsExtra.writeJSONSync(pkgJsonPath, pkgJson, { spaces: 2 });

  // ** writing tailwind config
  fsExtra.copyFileSync(tailwindSrc, tailwindDist);

  // ** writing postcss config
  fsExtra.copyFileSync(postcssSrc, postcssDist);

  // ** writing prettier config
  fsExtra.copyFileSync(tailwindPrettierSrc, tailwindPrettierDist);

  // ** writing app.css
  fsExtra.copyFileSync(tailwindCssSrc, tailwindCssDist);
}
