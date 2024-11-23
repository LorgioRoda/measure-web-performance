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
        const jsFiles = glob.sync(`${resolvedDir}/**/*.js`, {
            ignore: ['node_modules/**'],
        });

        if (jsFiles.length === 0) {
            core.warning(`No JavaScript files found in ${resolvedDir}`);
            return;
        }

        let totalSize = 0;
        jsFiles.forEach((file) => {
            const stats = fs.statSync(file);
            totalSize += stats.size;
            console.log(`File: ${file} - Size: ${(stats.size / 1024).toFixed(2)} KB`);
        });

        const totalSizeInKB = (totalSize / 1024).toFixed(2);
        core.setOutput('js_size_kb', totalSizeInKB);
        console.log(`Total JavaScript size: ${totalSizeInKB} KB`);
    } catch (error) {
        core.setFailed('Action failed with error');
    }
}

run();