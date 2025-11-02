import chalk from "chalk";

export const log = (message: string) => {
  const timestamp = chalk.gray(`[${new Date().toLocaleTimeString()}]`);
  console.log(`${timestamp} ${message}`);
};
