# Measure JavaScript Size Action

This GitHub Action measures the total size of JavaScript files in your project's build directory. It ensures that your JavaScript stays within defined performance budgets.

## Features
- Calculates the total size of `.js` files in a specified directory.
- Compares the size against a custom budget defined in `budget.json`.
- Fails the workflow if the size exceeds the specified budget.

## Inputs

| Name        | Description                             | Required | Default |
|-------------|-----------------------------------------|----------|---------|
| `build_dir` | Path to the directory containing `.js` files | Yes      |         |

## Outputs

| Name          | Description                      |
|---------------|----------------------------------|
| `js_size_kb`  | Total size of JavaScript in KB   |

## Usage

```yaml
name: Measure JavaScript Size

on:
  push:
    branches:
      - main

jobs:
  measure-js:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Measure JavaScript Size
      uses: LorgioRoda/mesure-web-performance@v0.0.7
      with:
        build_dir: ./dist
```

## Custom Budget
To define a custom budget, include a `budget.json` file in the root of your repository:

```json
{
  "jsBudgetKB": 500
}
```

If the total JavaScript size exceeds the budget, the workflow will fail.

