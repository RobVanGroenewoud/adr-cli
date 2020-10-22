#!/usr/bin/env node

const program = require("commander");
const list = require("./lib/commands/list");
const { exit } = require("process");

program.name("adr");

program.command("list").description("list ADRs").action(list);

program.parseAsync(process.argv).catch((error) => {
  console.log(error);
  exit(1);
});
