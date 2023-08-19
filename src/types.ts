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
  projectName: string;
  packages: stackPackages[];
  flags: cliFlags;
}

export type utilityFlags = Pick<cliFlags, "noGit" | "noInstall" | "noLib">;
