#!/usr/bin/env node

const program = require("commander");
const initCommand = require("./lib/commands/init");
const newCommand = require("./lib/commands/new");
const list = require("./lib/commands/list");
const { exit } = require("process");

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
