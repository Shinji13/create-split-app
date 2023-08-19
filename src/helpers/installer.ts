import ora from "ora";
import { luciaInstaller } from "../installers/luciaInstaller.js";
import { prismaInstaller } from "../installers/prismaInstaller.js";
import { socketIoInstaller } from "../installers/socketIo.js";
import { tailwindInstaller } from "../installers/tailwindInstaller.js";
import { zodInstaller } from "../installers/zod.js";
import { installer, stackPackages } from "../types.js";
import { logger } from "../utils/logger.js";
import chalk from "chalk";

const installerMap: Map<stackPackages, installer> = new Map<
  stackPackages,
  installer
>([
  ["zod", zodInstaller],
  ["lucia", luciaInstaller],
  ["prisma", prismaInstaller],
  ["tailwind", tailwindInstaller],
  ["socketIo", socketIoInstaller],
]);


export function installer(packages:stackPackages[],projectDirAbsolutePath:string,noLib:boolean,extraSrc:string){
    logger.info("adding packages setup")
    for(let pkg of packages){
       const spinner= ora(`working on ${chalk.blue.bold(pkg)} setup`).start()
       let currentInstaller=installerMap.get(pkg)    
       currentInstaller(extraSrc,projectDirAbsolutePath,packages,noLib)
       spinner.succeed(chalk.green(`setting up ${chalk.blue.bold(pkg)} complete successfully`))
    }
}