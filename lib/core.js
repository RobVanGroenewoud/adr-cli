import fs from "fs";
import path from "path";

const defaultAdrConfigFile = ".adr-dir";

function getTemplate(templateName) {
  return fs.readFileSync(
    new URL(`templates/${templateName}.md`, import.meta.url),
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

function isAdrFile(file) {
  return /^\d+-.*\.md$/.test(file.name);
}

function joinPaths(dir) {
  return (files) => files.map((file) => path.join(dir, file.name));
}

function getAllAdrFilePathsIn(adrDir) {
  return fs.promises
    .readdir(adrDir, { withFileTypes: true })
    .then((files) => files.filter(isAdrFile))
    .then(joinPaths(adrDir))
    .catch(() => {
      throw `Couldn't read ADR directory '${adrDir}'`;
    });
}

function getAdrFiles() {
  return getAdrDir().then(getAllAdrFilePathsIn);
}

export { getAdrDir, getAdrFiles, defaultAdrConfigFile, getTemplate };
