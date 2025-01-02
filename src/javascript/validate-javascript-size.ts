import * as core from "@actions/core";
export interface SizeValidationInput {
  totalSizeInKB: string;
  jsBudgetKB: number;
}

export const validateJavaScriptSize = ({
  totalSizeInKB,
  jsBudgetKB,
}: SizeValidationInput) => {
  if (parseFloat(totalSizeInKB) > jsBudgetKB) {
    core.setFailed(
      `❌ JavaScript size (${totalSizeInKB} KB) exceeds the budget (${jsBudgetKB} KB). Please optimize your build.`
    );
  } else {
    core.setOutput("js_size_kb", totalSizeInKB);
    console.log(`✅ JavaScript size is within the budget.`);
  }
};
