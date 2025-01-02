# Measure JavaScript and CSS Size Action

This GitHub Action measures the total size of JavaScript and CSS files in your project's build directory. It ensures that your assets stay within defined performance budgets.

## Features
- Calculates the total size of `.js` and `.css` files in a specified directory.
- Compares the size against a custom budget defined in `budget.json`.
- Fails the workflow if the size of JavaScript or CSS exceeds the specified budget.

## Inputs

| Name        | Description                             | Required | Default |
|-------------|-----------------------------------------|----------|---------|
| `build_dir` | Path to the directory containing `.js`  files | Yes      |         |
| `build_dir` | Path to the directory containing `.css` files |      | No        |

## Outputs

| Name          | Description                      |
|---------------|----------------------------------|
| `js_size_kb`  | Total size of JavaScript in KB   |
| `css_size_kb` | Total size of CSS in KB          |

## Usage

```yaml
name: Measure JavaScript and CSS Size

on:
  push:
    branches:
      - main

jobs:
  measure-assets:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Measure JavaScript and CSS Size
      uses: LorgioRoda/measure-web-performance@v1.1.0
      with:
        build_dir: ./dist
```

## Custom Budget
To define a custom budget, include a `budget.json` file in the root of your repository:

```json
{
  "jsBudgetKB": 500,
  "cssBudgetKB": 200
}
```

If the total JavaScript or CSS size exceeds the respective budget, the workflow will fail.
