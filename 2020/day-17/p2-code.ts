import { getInputByLine, removeDuplicateObjectsFromArray } from '../../utils';
import isEqual from 'lodash/isEqual.js';

const INPUT_LINES = getInputByLine(__dirname, 'p1-input.txt');

const initialActiveCoordinates = getActiveCoordinatesFromInputLines(
  INPUT_LINES
);

export const getAnswer = () => {
  // let currentActiveCoordinates = initialActiveCoordinates;
  let currentActiveCoordinates = [
    { w: 0, x: 1, y: 0, z: 0 },
    { w: 0, x: 2, y: 1, z: 0 },
    { w: 0, x: 0, y: 2, z: 0 },
    { w: 0, x: 1, y: 2, z: 0 },
    { w: 0, x: 2, y: 2, z: 0 },
  ];
  for (let i = 0; i < 6; i++) {
    console.log(`Running iteration number ${i}`);
    currentActiveCoordinates = getActiveCoordinatesAfterNextCycle(
      currentActiveCoordinates
    );
  }
  // @ts-ignore
  console.log('Answer>>>', currentActiveCoordinates.length);
};

export function getActiveCoordinatesFromInputLines(inputLines) {
  let activeCoordinates = [];
  for (let lineNumber = 0; lineNumber < inputLines.length; lineNumber++) {
    for (
      let characterNumber = 0;
      characterNumber < inputLines[lineNumber].length;
      characterNumber++
    ) {
      if (inputLines[lineNumber][characterNumber] === '#') {
        activeCoordinates.push({
          w: 0,
          x: characterNumber,
          y: lineNumber,
          z: 0,
        });
      }
    }
  }
  return activeCoordinates;
}

export function getNeighboringCoordinates(coordinate) {
  const result = [];
  for (let w = coordinate.w - 1; w <= coordinate.w + 1; w++) {
    for (let x = coordinate.x - 1; x <= coordinate.x + 1; x++) {
      for (let y = coordinate.y - 1; y <= coordinate.y + 1; y++) {
        for (let z = coordinate.z - 1; z <= coordinate.z + 1; z++) {
          if (
            w === coordinate.w &&
            x === coordinate.x &&
            y === coordinate.y &&
            z === coordinate.z
          ) {
            continue;
          }
          result.push({ w, x, y, z });
        }
      }
    }
  }
  return result;
}

export function getActiveCoordinatesAfterNextCycle(currentActiveCoordinates) {
  const newActiveCoordinates = [...currentActiveCoordinates];
  const allCoordinatesToEvaluate = getAllCoordinatesToEvaluate(
    currentActiveCoordinates
  );
  for (const coordinate of allCoordinatesToEvaluate) {
    let activeNeighborCount = 0;
    const neighbors = getNeighboringCoordinates(coordinate);
    for (const neighbor of neighbors) {
      if (isCoordinateActive(neighbor)) {
        activeNeighborCount += 1;
      }
      // No further changes happen after 4 active neighbors
      if (activeNeighborCount === 4) {
        break;
      }
    }
    if (
      isCoordinateActive(coordinate) &&
      (activeNeighborCount < 2 || activeNeighborCount > 3)
    ) {
      newActiveCoordinates.splice(
        newActiveCoordinates.findIndex((newActiveCoordinate) =>
          isEqual(coordinate, newActiveCoordinate)
        ),
        1
      );
    }

    if (!isCoordinateActive(coordinate) && activeNeighborCount === 3) {
      newActiveCoordinates.push(coordinate);
    }
  }

  return newActiveCoordinates;

  function isCoordinateActive(coordinate) {
    return currentActiveCoordinates.some((activeCoordinate) =>
      isEqual(activeCoordinate, coordinate)
    );
  }
}

/**
 * Gets all active coordinates and their neighbors and returns an array with
 * no duplicates
 */
export function getAllCoordinatesToEvaluate(activeCoordinates) {
  let result = [...activeCoordinates];
  for (const coordinate of activeCoordinates) {
    const neighbors = getNeighboringCoordinates(coordinate);
    result = [...result, ...neighbors];
  }
  return removeDuplicateObjectsFromArray(result);
}
