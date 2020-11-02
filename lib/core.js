const fs = require("fs");
const path = require("path");

const defaultAdrConfigFile = ".adr-dir";

function getTemplate(templateName) {
  return fs.readFileSync(
    __dirname + path.normalize(`/templates/${templateName}.md`),
    "utf8"
  );
}

function getAdrDir() {
  return fs.promises
    .readFile(defaultAdrConfigFile, { encoding: "utf8" })
    .then((adrDir) => adrDir.trim())
    .catch(() => {
      throw "Couldn't detect ADR directory";
    });
}

function isMarkdownFile(file) {
  return file.name.endsWith(".md");
}

function joinPaths(dir) {
  return (files) => files.map((file) => path.join(dir, file.name));
}

function getAllMarkDownFilePathsIn(adrDir) {
  return fs.promises
    .readdir(adrDir, { withFileTypes: true })
    .then((files) => files.filter(isMarkdownFile))
    .then(joinPaths(adrDir))
    .catch(() => {
      throw `Couldn't read ADR directory '${adrDir}'`;
    });
}

function getAdrFiles() {
  return getAdrDir().then(getAllMarkDownFilePathsIn);
}

module.exports = {
  getAdrDir,
  getAdrFiles,
  defaultAdrConfigFile,
  getTemplate,
};
