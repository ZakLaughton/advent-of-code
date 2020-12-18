import { getInputByLine, removeDuplicateObjectsFromArray } from "../../utils";
import { isEqual } from "lodash";

// @ts-ignore
const INPUT_LINES = getInputByLine(__dirname, "p1-input.txt");

export interface Coordinate {
  x: number;
  y: number;
  z: number;
}

const initialActiveCoordinates = getActiveCoordinatesFromInputLines(INPUT_LINES);

let currentActiveCoordinates = initialActiveCoordinates;

// Uncomment to get answer (long-running)
// for (let i = 0; i < 6; i++) {
//   currentActiveCoordinates = getActiveCoordinatesAfterNextCycle(currentActiveCoordinates);
// }

// console.log("ANSWER>>>", currentActiveCoordinates.length);

export function getActiveCoordinatesFromInputLines(inputLines: string[]) {
  let activeCoordinates: Coordinate[] = [];
  for (let lineIndex = 0; lineIndex < inputLines.length; lineIndex++) {
    const line = inputLines[lineIndex];
    for (let colNumber = 0; colNumber < line.length; colNumber++) {
      if (line[colNumber] === "#") {
        activeCoordinates.push({ x: colNumber, y: lineIndex, z: 0 });
      }
    }
  }
  return activeCoordinates;
}

export function getNeighboringCoordinates(coordinate: Coordinate) {
  const result = [];
  for (let x = coordinate.x - 1; x <= coordinate.x + 1; x++) {
    for (let y = coordinate.y - 1; y <= coordinate.y + 1; y++) {
      for (let z = coordinate.z - 1; z <= coordinate.z + 1; z++) {
        if (x === coordinate.x && y === coordinate.y && z === coordinate.z) {
          continue;
        }
        result.push({ x, y, z });
      }
    }
  }
  return result;
}

export function getActiveCoordinatesAfterNextCycle(currentActiveCoordinates: Coordinate[]) {
  const newActiveCoordinates = [...currentActiveCoordinates];
  const allCoordinatesToEvaluate = getAllCoordinatesToEvaluate(currentActiveCoordinates);
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
    if (isCoordinateActive(coordinate) && (activeNeighborCount < 2 || activeNeighborCount > 3)) {
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

  function isCoordinateActive(coordinate: Coordinate) {
    return currentActiveCoordinates.some((activeCoordinate) =>
      isEqual(activeCoordinate, coordinate)
    );
  }
}

/**
 * Gets all active coordinates and their neighbors and returns an array with
 * no duplicates
 */
export function getAllCoordinatesToEvaluate(activeCoordinates: Coordinate[]) {
  let result = [...activeCoordinates];
  for (const coordinate of activeCoordinates) {
    const neighbors = getNeighboringCoordinates(coordinate);
    result = [...result, ...neighbors];
  }
  return removeDuplicateObjectsFromArray(result);
}
