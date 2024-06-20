#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { findUnusedVariables } = require('../lib/index');

const argv = yargs(hideBin(process.argv))
  .option('config', {
    alias: 'c',
    type: 'string',
    description: 'Path to the configuration file',
    default: 'css-variable-checker.config.json'
  })
  .option('json', {
    alias: 'j',
    type: 'boolean',
    description: 'Output the results as a JSON string'
  })
  .help()
  .argv;

const configPath = path.resolve(process.cwd(), argv.config);

if (!fs.existsSync(configPath)) {
  console.error(`Configuration file not found: ${configPath}`);
  process.exit(1);
}

const config = require(configPath);
const unusedVariables = findUnusedVariables(config);

if (argv.json) {
  console.log(JSON.stringify(unusedVariables, null, 2));
} else {
  const outputPath = path.join(process.cwd(), 'output.json');
  fs.writeFileSync(outputPath, JSON.stringify(unusedVariables, null, 2));
  console.log(`Done! Check ${outputPath} for results.`);
}
