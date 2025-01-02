import * as core from "@actions/core";
import { measureJsSize } from "./javascript/measuare-js-size";

async function run(): Promise<void> {
  try {
    measureJsSize();
  } catch (error) {
    core.setFailed("❌ Action failed with error");
  }
}

run();
