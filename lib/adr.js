import fs from "fs/promises";
import path from "path";
import slugify from "slugify";
import { getAdrDir, getAdrFiles, getTemplate } from "./core.js";

function getISODate(date) {
  const timestamp = date || new Date();
  return timestamp.toISOString().split("T")[0];
}

function fromTemplate(template, { title, number }) {
  return template.replace("{{date}}", getISODate()).replace("{{title}}", title).replace("{{number}}", number);
}

async function createFromTemplate(templateName, title) {
  const number = await getNextAvailableNumber();
  const fileName = generateFileName(title, number);
  const template = getTemplate(templateName);
  const adrContent = fromTemplate(template, { title, number });
  return getAdrDir().then((adrDir) => fs.writeFile(path.join(adrDir, fileName), adrContent));
}

function generateFileName(title, number) {
  const safeTitle = slugify(title, { lower: true });
  const formattedNumber = String(number).padStart(4, "0");
  return `${formattedNumber}-${safeTitle}.md`;
}

async function getNextAvailableNumber() {
  const adrFiles = await getAdrFiles();
  const lastAdrFile = path.basename(adrFiles.pop() || "0");
  const lastNumber = lastAdrFile.match(/\d+/g).map(Number)[0];
  return lastNumber + 1;
}

export { createFromTemplate };
