const fs = require("fs");

const { createFromTemplate } = require("../adr");
const { defaultAdrConfigFile } = require("../core");
const list = require("./list");

function action(directory) {
  const newDir = directory || "doc/adrs";
  return fs.promises
    .writeFile(defaultAdrConfigFile, newDir)
    .then(() => !fs.existsSync(newDir) && fs.promises.mkdir(newDir))
    .then(() => createFromTemplate("init").then(list));
}

module.exports = {
  command: "init [directory]",
  description: "Initializes the directory of architecture decision records",
  action,
};
