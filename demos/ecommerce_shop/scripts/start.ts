#!/usr/bin/env node
import "dotenv/config";
import * as yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { AppRunner } from "../../common/scripts/app-runner";
import { validateEnvironmentVariables } from "../../common/scripts/env";
import { Context } from "../../common/scripts/context";
import { buildConfig } from "../frontend/webpack.config.cjs";
import * as path from "path";

// Define the CLI arguments interface to match Context's expected type
interface CliArgs {}

const appRunner = new AppRunner();

validateEnvironmentVariables();

yargs(hideBin(process.argv))
  .version(false)
  .help()
  .command(
    "$0",
    "Starts local development",
    () => {},
    (args: yargs.ArgumentsCamelCase<{}>) => {
      const ctx = new Context(args as CliArgs, path.join(__dirname, ".."));
      appRunner.run(ctx, buildConfig);
    },
  )
  .parse();