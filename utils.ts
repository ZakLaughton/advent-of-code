const fs = require("fs");
import { isEqual, uniqWith } from "lodash";

function getInputByLine(directory, fileName) {
  const inputPath = `${directory}/${fileName}`;
  return fs.readFileSync(inputPath, "utf8").split("\n");
}

function removeDuplicateObjectsFromArray(objectArray) {
  return uniqWith(objectArray, isEqual);
}

export { getInputByLine, removeDuplicateObjectsFromArray };
