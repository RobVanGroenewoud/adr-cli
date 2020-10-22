const { getAdrFiles } = require("../core");

function toConsole(adrFiles) {
  adrFiles.forEach((adrFile) => console.log(adrFile));
}

function list() {
  return getAdrFiles().then(toConsole);
}

module.exports = list;
