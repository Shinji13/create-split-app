import path from "path";
import { removeTrailingSlash } from "./removeTrailingSlash.js";

export function parsePath(rawInput: string) {
  const input = removeTrailingSlash(rawInput);
  const paths = input.split("/");
  let appName = paths[paths.length - 1];
  // ** we allowed the user to enter . as name for the project meaning he want to use current directory as project holder
  if (appName == ".") {
    appName = path.basename(process.cwd());
  }
  const splitPoint = paths.findIndex((val) => val.startsWith("@"));
  const parentDir = paths.filter((val) => !val.startsWith("@")).join("/");
  if (splitPoint !== -1) {
    appName = paths.slice(splitPoint).join("/");
  }
  return [appName, parentDir];
}
