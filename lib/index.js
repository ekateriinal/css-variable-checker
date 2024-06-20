const postcss = require('postcss');
const fs = require('fs');
const path = require('path');

// Function to extract variables from a CSS file
function extractVariables(cssFilePath) {
  const css = fs.readFileSync(cssFilePath, 'utf-8');
  const root = postcss.parse(css);
  const variables = new Set();

  root.walkDecls(decl => {
    if (decl.prop.startsWith('--')) {
      variables.add(decl.prop);
    }
  });

  return { variables };
}

// Function to recursively get all CSS files in a directory
function getCssFiles(dirPath, arrayOfCssFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfCssFiles = getCssFiles(fullPath, arrayOfCssFiles);
    } else if (file.endsWith('.css')) {
      arrayOfCssFiles.push(fullPath);
    }
  });

  return arrayOfCssFiles;
}

// Function to find unused variables
function findUnusedVariables(config) {
  const mainCssFiles = config.mainCssFiles.map(file => path.resolve(config.baseDir, file));
  const mainVariables = {};

  mainCssFiles.forEach(file => {
    const { variables: fileVariables } = extractVariables(file);
    mainVariables[file] = [...fileVariables];
  });

  const componentFiles = getCssFiles(path.resolve(config.baseDir, config.componentsDir));
  const componentVariables = new Set();

  componentFiles.forEach(filePath => {
    const { variables: fileVariables } = extractVariables(filePath);
    fileVariables.forEach(variable => componentVariables.add(variable));
  });

  const unusedVariables = {};
  Object.entries(mainVariables).forEach(([filePath, variables]) => {
    const shortPath = filePath.split(path.sep).slice(-2).join(path.sep);
    unusedVariables[shortPath] = variables.filter(variable => !componentVariables.has(variable));
  });

  return unusedVariables;
}

module.exports = { findUnusedVariables };
