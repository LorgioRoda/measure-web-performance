import * as core from "@actions/core";
import * as fs from "fs";
import { validateBuildDirectory } from "../util/validate-build-directory";
import { getCssBudget, validateBudgetFile } from "../budget/validate-budget";
import { findCssFiles } from "./find-css-files";
import { bytesToKilobytes } from "../util/bytes-to-kilobytes";
import { validateCssSize } from "./validate-css-size";
export const measureJsSize = (): void => {
  try {
    const buildDir = core.getInput("build_dir");
    const resolvedDir = validateBuildDirectory(buildDir);

    const budgetPath = validateBudgetFile(process.env.GITHUB_WORKSPACE || "");
    const budget = getCssBudget(budgetPath);

    const cssBudgetKB = budget.cssBudgetKB;

    const cssFiles = findCssFiles(resolvedDir);

    let totalSize = 0;
    cssFiles.forEach((file) => {
      const stats = fs.statSync(file);
      totalSize += stats.size;
    });

    const totalSizeInKB = bytesToKilobytes(totalSize);

    validateCssSize({ totalSizeInKB, cssBudgetKB });
  } catch (error) {
    core.setFailed("❌ Action failed with error");
  }
};
