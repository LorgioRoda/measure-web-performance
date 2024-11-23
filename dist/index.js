"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
const glob = __importStar(require("glob"));
const path = __importStar(require("path"));
async function run() {
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
    }
    catch (error) {
        core.setFailed('Action failed with error');
    }
}
run();
