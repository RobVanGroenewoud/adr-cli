const fs = require("fs/promises");

const { getAdrDir, getTemplate } = require("./core");

function getISODate(date) {
  const timestamp = date || new Date();
  return timestamp.toISOString().split("T")[0];
}

function fromTemplate(template) {
  return template.replace("{{date}}", getISODate());
}

function createFromTemplate(templateName) {
  const template = getTemplate(templateName);
  const adrContent = fromTemplate(template);
  return getAdrDir().then((adrDir) =>
    fs.writeFile(`${adrDir}/0001-record-architecture-decisions.md`, adrContent)
  );
}

module.exports = { createFromTemplate };
