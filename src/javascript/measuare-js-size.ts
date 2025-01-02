import * as core from "@actions/core";
import * as fs from "fs";
import { getBudget, validateBudgetFile } from "../budget/validate-budget";
import { validateJavaScriptSize } from "./validate-javascript-size";
import { validateBuildDirectory } from "../util/validate-build-directory";
import { findJavaScriptFiles } from "./find-javascript-files";
import { bytesToKilobytes } from "../util/bytes-to-kilobytes";

export const measureJsSize = (): void => {
  try {
    const buildDir = core.getInput("build_dir");
    const resolvedDir = validateBuildDirectory(buildDir);

    const budgetPath = validateBudgetFile(process.env.GITHUB_WORKSPACE || "");
    const budget = getBudget(budgetPath);

    const jsBudgetKB = budget.jsBudgetKB;

    const jsFiles = findJavaScriptFiles(resolvedDir);

    let totalSize = 0;
    jsFiles.forEach((file) => {
      const stats = fs.statSync(file);
      totalSize += stats.size;
    });

    const totalSizeInKB = bytesToKilobytes(totalSize);

    validateJavaScriptSize({ totalSizeInKB, jsBudgetKB });
  } catch (error) {
    core.setFailed("❌ Action failed with error");
  }
};
