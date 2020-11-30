const fs = require("fs");
const path = require("path");

const { createFromTemplate } = require("../adr");
const list = require("./list");

async function action(title) {
  return createFromTemplate("new", title.join(" ")).then(list);
}

module.exports = {
  command: "new <title...>",
  description: "Creates a new, numbered ADR.",
  action,
};
