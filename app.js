import inquirer from 'inquirer';
import chalk from 'chalk';
import YAML from 'yaml';
// import fs from 'fs';
import { updateDockerComposeConfig } from './src/docker/dockerCompose.js';
import path from 'path';
import fs from 'fs-extra';
import yml from 'js-yaml';

(async () => {
  console.log(chalk.yellow('Creating docker-compose.yml...'));

  // Load the yml file from src folder.
  const sourceFile = fs.readFileSync(
    './src/config/docker-compose.source.yml',
    'utf8',
  );
  const file = await yml.load(sourceFile);
  const newConfig = updateDockerComposeConfig(file);
  fs.writeFileSync(
    path.join(process.cwd(), 'docker-compose.yml'),
    yml.dump(newConfig, { forceQuotes: true, quotingType: '"' }),
  );
  console.log(chalk.green('Done!'));

  // Copy dockerfile.
  console.log(chalk.yellow('Creating Dockerfile...'));
  const dockerFile = fs.readFileSync('./src/config/Dockerfile');
  fs.writeFileSync(path.join(process.cwd(), 'Dockerfile'), dockerFile);
  console.log(chalk.green('Done!'));

  // Copy VM folder.
  console.log(chalk.yellow('Donwloading further configuration files...'));
  fs.copy('./src/config/VM', path.join(process.cwd(), 'VM'));
  console.log(chalk.green('Done!'));
})();
