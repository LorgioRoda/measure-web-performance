import * as fs from "fs";
import * as path from "path";

export const validateBuildDirectory = (buildDir: string): string => {
  if (!buildDir || !fs.existsSync(buildDir)) {
    throw new Error(`Invalid or missing build directory: ${buildDir}`);
  }
  return path.resolve(buildDir);
};
