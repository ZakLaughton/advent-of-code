const { readFileSync } = require('fs');
const { isEqual, uniqWith } = require('lodash');

function getInputByLine(directory: string, fileName: string) {
  const inputPath = `${directory}/${fileName}`;
  return readFileSync(inputPath, 'utf8').split('\n');
}

function removeDuplicateObjectsFromArray<T>(objectArray: T[]): T[] {
  return uniqWith(objectArray, isEqual);
}

module.exports = { getInputByLine, removeDuplicateObjectsFromArray };
