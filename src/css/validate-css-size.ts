import * as core from "@actions/core";
export interface SizeValidationInput {
  totalSizeInKB: string;
  cssBudgetKB: number;
}

export const validateCssSize = ({
  totalSizeInKB,
  cssBudgetKB,
}: SizeValidationInput) => {
  if (parseFloat(totalSizeInKB) > cssBudgetKB) {
    core.setFailed(
      `❌ Css size (${totalSizeInKB} KB) exceeds the budget (${cssBudgetKB} KB). Please optimize your build.`
    );
  } else {
    core.setOutput("css_size_kb", totalSizeInKB);
    console.log(`✅ Csssize is within the budget.`);
  }
};
