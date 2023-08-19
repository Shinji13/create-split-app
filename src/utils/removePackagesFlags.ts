import { utiltyFlagsDefault } from "../consts.js";
import { cliFlags, utilityFlags } from "../types.js";

export function removePackagesFlags(flags: cliFlags): utilityFlags {
  let newFlags = utiltyFlagsDefault;
  for (let [key, value] of Object.entries(flags)) {
    if (newFlags[key] !== undefined) newFlags[key] = value;
  }
  return newFlags;
}
