import * as glob from "glob";
import * as core from "@actions/core";

export const findJavaScriptFiles = (resolvedDir: string): string[] => {
  const jsFiles = glob.sync(`${resolvedDir}/**/*.js`, {
    ignore: ["node_modules/**"],
  });

  if (jsFiles.length === 0) {
    core.warning(`No JavaScript files found in ${resolvedDir}`);
    return [];
  }

  return jsFiles;
};
