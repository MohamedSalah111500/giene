/* eslint-disable no-console */
const chalk = require("react-dev-utils/chalk");
const { execSync } = require("child_process");

const envArg = process.argv.find(arg => arg.startsWith("env="));
const appEnv = (envArg && envArg.split("=")[1]) || process.env.REACT_APP_ENV || "production";

if (appEnv) {
  console.log(chalk.blue(`Backing a build for ${chalk.green.bold(appEnv)} environment`));

  const script = `env-cmd -f .env.${appEnv} react-scripts build`;
  execSync(script, { stdio: "inherit" });
}
