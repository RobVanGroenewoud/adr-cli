import { getAdrFiles } from "../core.js";

function toConsole(adrFiles) {
  adrFiles.forEach((adrFile) => console.log(adrFile));
}

function list() {
  return getAdrFiles().then(toConsole);
}

export default list;
