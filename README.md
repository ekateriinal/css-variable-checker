
# CSS Variable Checker

A tool to check for unused CSS variables in your project.

## Installation

To install the package locally within a project:

```sh
npm install css-variable-checker --save-dev
```

## Setup
Add a script to your project's package.json to run the checker:

```json
{
  "scripts": {
    "check-css-variables": "css-variable-checker --config path/to/your/config.json"
    }
}
```
## Usage

#### Configuration File
Create a configuration file named css-variable-checker.config.json in your project root. Here is an example configuration:

```json
{
  "baseDir": "./",
  "mainCssFiles": [
    "src/styles/variables/colors.css",
    "src/styles/variables/typography.css",
    "src/styles/styles.css",
    "tokens/variables/color.css",
    "tokens/variables/float.css"
  ],
  "componentsDir": "src/components/"
}

```
#### Running the Checker
1. **Create the configuration file**: Ensure you have a css-variable-checker.config.json file in your project root with paths to your main CSS files and component directories.
2. **Run the checker**: Use the script defined in your package.json to check for unused CSS variables:
```
npm run check-css-variables
```
3. **Check the output**: The results will be printed to the console and written to output.json in your project root directory.

### Example Configuration File
```json
{
  "baseDir": "./",
  "mainCssFiles": [
    "src/styles/variables/colors.css",
    "src/styles/variables/typography.css",
    "src/styles/styles.css",
    "tokens/variables/color.css",
    "tokens/variables/float.css"
  ],
  "componentsDir": "src/components/"
}

```
