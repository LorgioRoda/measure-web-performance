import * as core from '@actions/core';
import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';

async function run(): Promise<void> {
    try {
        const buildDir = core.getInput('build_dir');
        if (!buildDir) {
            throw new Error("Input 'build_dir' is required");
        }

        const resolvedDir = path.resolve(buildDir);

        const budgetPath = path.resolve(process.env.GITHUB_WORKSPACE || '', 'budget.json');

        if (!fs.existsSync(budgetPath)) {
            throw new Error("Budget file 'budget.json' not found in the root of the project");
        }

        const budget = JSON.parse(fs.readFileSync(budgetPath, 'utf-8'));

        const jsBudgetKB = budget.jsBudgetKB;
        if (!jsBudgetKB) {
            throw new Error("The 'jsBudgetKB' key is missing in budget.json");
        }

        const jsFiles = glob.sync(`${resolvedDir}/**/*.js`, { ignore: ['node_modules/**'] });

        if (jsFiles.length === 0) {
            core.warning(`No JavaScript files found in ${resolvedDir}`);
            return;
        }

        let totalSize = 0;
        jsFiles.forEach((file) => {
            const stats = fs.statSync(file);
            totalSize += stats.size;
        });

        const totalSizeInKB = (totalSize / 1024).toFixed(2);

        if (parseFloat(totalSizeInKB) > jsBudgetKB) {
            core.setFailed(
                `❌ JavaScript size (${totalSizeInKB} KB) exceeds the budget (${jsBudgetKB} KB). Please optimize your build.`
            );
        } else {
            core.setOutput('js_size_kb', totalSizeInKB);
            console.log(`✅ JavaScript size is within the budget.`);
        }

    } catch (error) {
        core.setFailed('❌ Action failed with error');
    }
}

run();
