import fs from "fs";
import { createFromTemplate } from "../adr.js";
import { defaultAdrConfigFile, getAdrFiles } from "../core.js";
import list from "./list.js";

function action(directory) {
  const newDir = directory || "doc/adrs";

  return fs.promises
    .writeFile(defaultAdrConfigFile, newDir)
    .then(
      () =>
        !fs.existsSync(newDir) && fs.promises.mkdir(newDir, { recursive: true })
    )
    .then(getAdrFiles)
    .then(
      (adrFiles) =>
        !adrFiles.length &&
        createFromTemplate("init", "Record Architecture Decisions")
    )
    .then(list);
}

export default {
  command: "init [directory]",
  description: "Initializes the directory of architecture decision records",
  action,
};
