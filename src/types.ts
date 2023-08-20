export type stackPackages =
  | "lucia"
  | "prisma"
  | "tailwind"
  | "zod"
  | "socketIo";

export type cliFlags = {
  default: boolean;
  CI: boolean;
  noGit: boolean;
  noInstall: boolean;
  noLib: boolean;
  prisma: boolean;
  lucia: boolean;
  zod: boolean;
  tailwind: boolean;
  socketIo: boolean;
};

export interface cliSettings {
  userNameInput: string;
  packages: stackPackages[];
  flags: cliFlags;
}

export type utilityFlags = Pick<cliFlags, "noGit" | "noInstall" | "noLib">;

export type availablePackage =
  | "@sveltejs/adapter-node"
  | "@types/express"
  | "@lucia-auth/adapter-prisma"
  | "@prisma/client"
  | "@types/node"
  | "prettier-plugin-tailwindcss"
  | "express"
  | "lucia"
  | "prisma"
  | "socket.io"
  | "socket.io-client"
  | "tailwindcss"
  | "zod"
  | "postcss"
  | "autoprefixer";

export type installer = (
  extraSrc: string,
  projectDirAbsolutePath: string,
  packages?: stackPackages[],
  noLib?: boolean
) => void;

export type packageManager = "npm" | "pnpm" | "yarn";
