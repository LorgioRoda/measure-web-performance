import * as core from "@actions/core";
import { mesureJsSize } from "./javascript/mesuare-js-size";
import { validateBuildDirectory } from "./util/validate-build-directory";

async function run(): Promise<void> {
  try {
    mesureJsSize();
  } catch (error) {
    core.setFailed("❌ Action failed with error");
  }
}

run();
