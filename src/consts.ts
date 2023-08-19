import path from "path";
import { fileURLToPath } from "url";
import { cliSettings, stackPackages, utilityFlags } from "./types.js";

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../");

// stack name
export const title = "CREATE-SPLIT-APP";
export const defaultProjectName = "my-split-app";

//packages that goona be used
export const stackPackagesArray: [
  "prisma",
  "lucia",
  "tailwind",
  "zod",
  "socketIo"
] = ["prisma", "lucia", "tailwind", "zod", "socketIo"];

export const defaultPackages: stackPackages[] = [
  "prisma",
  "lucia",
  "tailwind",
  "zod",
];

export const defaultSettings: cliSettings = {
  userNameInput: defaultProjectName,
  flags: {
    default: false,
    CI: false,
    noGit: false,
    noInstall: false,
    noLib: false,
    prisma: false,
    lucia: false,
    zod: false,
    tailwind: false,
    socketIo: false,
  },
  packages: defaultPackages,
};

export const utiltyFlagsDefault: utilityFlags = {
  noGit: false,
  noInstall: false,
  noLib: false,
};
