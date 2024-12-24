import * as fs from "fs";
import * as path from "path";

export const validateBudgetFile = (workspace: string): string => {
  const budgetPath = path.resolve(workspace, "budget.json");
  if (!fs.existsSync(budgetPath)) {
    throw new Error(
      "Budget file 'budget.json' not found in the root of the project"
    );
  }
  return budgetPath;
};

export const getBudget = (budgetPath: string): { jsBudgetKB: number } => {
  const budget = JSON.parse(fs.readFileSync(budgetPath, "utf-8"));
  if (!budget.jsBudgetKB) {
    throw new Error("The 'jsBudgetKB' key is missing in budget.json");
  }
  return budget;
};
