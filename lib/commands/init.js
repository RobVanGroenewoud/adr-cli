import fs from "fs";
import { createFromTemplate } from "../adr.js";
import { defaultAdrConfigFile, getAdrFiles } from "../core.js";
import list from "./list.js";

async function action(directory) {
  const newDir = directory || "doc/adrs";

  await fs.promises.writeFile(defaultAdrConfigFile, newDir);
  await ensureDirectoryExists(newDir).then(createInitialAdr);

  return list();
}

async function ensureDirectoryExists(newDir) {
  return (
    !fs.existsSync(newDir) && fs.promises.mkdir(newDir, { recursive: true })
  );
}

async function createInitialAdr() {
  return getAdrFiles().then(
    (adrFiles) =>
      !adrFiles.length &&
      createFromTemplate("init", "Record Architecture Decisions")
  );
}

export default {
  command: "init [directory]",
  description: "Initializes the directory of architecture decision records",
  action,
};
