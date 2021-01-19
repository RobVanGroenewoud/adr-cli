#!/usr/bin/env node

import program from "commander";
import initCommand from "./lib/commands/init.js";
import newCommand from "./lib/commands/new.js";
import list from "./lib/commands/list.js";
import { exit } from "process";

program.name("adr");

program.command("list").description("list ADRs").action(list);

const commands = [initCommand, newCommand];
commands.forEach((command) =>
  program
    .command(command.command)
    .description(command.description)
    .action(command.action)
);

program.parseAsync(process.argv).catch((error) => {
  console.log(error);
  exit(1);
});
