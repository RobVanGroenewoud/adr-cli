import { createFromTemplate } from "../adr.js";
import list from "./list.js";

async function action(title) {
  return createFromTemplate("new", title.join(" ")).then(list);
}

export default {
  command: "new <title...>",
  description: "Creates a new, numbered ADR.",
  action,
};
