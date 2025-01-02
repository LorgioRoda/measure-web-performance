import * as glob from "glob";
import * as core from "@actions/core";

export const findCssFiles = (resolvedDir: string): string[] => {
  const cssFiles = glob.sync(`${resolvedDir}/**/*.css`, {
    ignore: ["node_modules/**"],
  });

  if (cssFiles.length === 0) {
    core.warning(`No Css files found in ${resolvedDir}`);
    return [];
  }

  return cssFiles;
};
