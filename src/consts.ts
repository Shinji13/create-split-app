import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../");

export const title = "CREATE-SPLIT-APP";
export const defaultProjectName = "my-split-app";
export type stackPackages =
  | "lucia"
  | "prisma"
  | "tailwind"
  | "zod"
  | "socketIo";
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
