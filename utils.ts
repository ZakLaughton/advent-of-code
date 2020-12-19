const { readFileSync } = require('fs');
const { isEqual, uniqWith } = require('lodash');

export function getInputByLine(directory: string, fileName: string): string[] {
  const inputPath = `${directory}/${fileName}`;
  return readFileSync(inputPath, 'utf8').split('\n');
}

export function removeDuplicateObjectsFromArray<T>(objectArray: T[]): T[] {
  return uniqWith(objectArray, isEqual);
}
