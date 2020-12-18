const fs = require("fs");

function getInputByLine(directory, fileName) {
  const inputPath = `${directory}/${fileName}`;
  return fs.readFileSync(inputPath, "utf8").split("\n");
}

exports.getInputByLine = getInputByLine;
