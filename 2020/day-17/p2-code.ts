// TODO idea: translate all objects to strings for easier comparison. See https://nopaste.ml/?l=js#XQAAAQBcCAAAAAAAAAAXin1KR4VVQayM1aKtS5aWizOAfuC2YtVJgJqxEs4OQ4fvJl9MgLNVb8QHvkseqa3Dd42wTWrpUi61FWKvn7WV9asNaK0932MqzsIYDTGJdHo3RVsvnfmGvuSSo72OOJppF62VxYDlHAgo/okt59+j+th37kYzxcill7W0/qYEbPTCYWaAmDpO8kxklGOXAh2HMdqb7gqtWaQrFkz6cUh3EgU6Xzs9nrHjJxr0Ia1CnQoeANq828hgfFCvTZu2IePf9WvShHT67Wb6weqx80SZqNkXhFgWNALU74lsKxc1ZwLI0mrwu+7P1Fno29WA8O6qzJ74OOVaQAHDZrYuNvrL3gFBqG1ujlRiXMI5kvTi3iRRiqz0gKJMdUPIuUfLiII9K2vzPiB3MDJdl6sKK8nRjfA+u6XynunWKD0NnqKE86oWjoNi4oGVUp2ca9bKG52SeWjVZwq2jml3mLOPY77XNwAyweZaAb8l+gu4iovtEGud9C3GnK8edHhRlYKmJceyrhRFS3+gatt8BNXsoUHrFqIWwfUHwS0p+Xa3Tqjv+s3LB+rHyPcGMJPR9iLR1YUz4AyEyCilggQjUmFWGuFb/7bESbHHdTlZq5Jy61M78sdlNzv/OtG9EbyMmyngyZFL3WGiePuv9J6ZvYrhW9RyA2+LB4dhIx+YoCq2xq/Di+cEsx1G3rC4DCDfuBW4cV/fW7xgBxwoOvzXi+kQX+YCzoq5D7ofDXVEuFyWP083u8npIBgoFqT09McWmdqhjOwFhEBLpqLeLDiNc12r50QoXkcv1p5HNh00HGUIm1j4jRTnugt9JwuLgiD78P0YZBiMIA4HWe9qlGPOXMnuGrBSUEigVUsMFEWVOhgijXVW6dTBY9hcm8DrxCr4gR3HJdjdymHOZzgErez21Dd4Z9WDQ3GEiIN8xNGowS5fWQ/qV7lY/x0+7sv6esytvrvflrC/CUwG1bmpWRWX1ANx+FbWEXTrqP/1FgMY

const {
  getInputByLine,
  // removeDuplicateObjectsFromArray,
} = require('../../utils');
// const isEqual = require('lodash/isEqual');

// @ts-ignore
const INPUT_LINES = getInputByLine(__dirname, 'p1-input.txt');
export type Coordinate = string;

getAnswer();

export function getAnswer(inputLines: string[] = INPUT_LINES) {
  const initialActiveCoordinates = getActiveCoordinatesFromInputLines(
    inputLines
  );

  let currentActiveCoordinates = initialActiveCoordinates;
  for (let i = 0; i < 6; i++) {
    console.log(
      `Running iteration number ${i} with ${currentActiveCoordinates.size} possibilities`
    );
    currentActiveCoordinates = getActiveCoordinatesAfterNextCycle(
      currentActiveCoordinates
    );
    console.log(
      `Total for iteration number ${i}:`,
      currentActiveCoordinates.size
    );
  }
  console.log('Answer>>>', currentActiveCoordinates.size);
}

export function getActiveCoordinatesFromInputLines(inputLines: string[]) {
  let activeCoordinates: Set<Coordinate> = new Set();
  for (let lineNumber = 0; lineNumber < inputLines.length; lineNumber++) {
    for (
      let characterNumber = 0;
      characterNumber < inputLines[lineNumber].length;
      characterNumber++
    ) {
      if (inputLines[lineNumber][characterNumber] === '#') {
        activeCoordinates.add(`0,${characterNumber},${lineNumber},0`);
      }
    }
  }
  return activeCoordinates;
}

export function getNeighboringCoordinates(coordinate: Coordinate) {
  const [originW, originX, originY, originZ] = coordinate
    .split(',')
    .map((value) => Number(value));
  const result: Coordinate[] = [];
  for (let w = originW - 1; w <= originW + 1; w++) {
    for (let x = originX - 1; x <= originX + 1; x++) {
      for (let y = originY - 1; y <= originY + 1; y++) {
        for (let z = originZ - 1; z <= originZ + 1; z++) {
          if (
            w === originW &&
            x === originX &&
            y === originY &&
            z === originZ
          ) {
            continue;
          }
          result.push(`${w},${x},${y},${z}`);
        }
      }
    }
  }
  return result;
}

export function getActiveCoordinatesAfterNextCycle(
  currentActiveCoordinates: Set<Coordinate>
) {
  const newActiveCoordinates: Set<Coordinate> = new Set();
  let allCoordinatesToEvaluate = getAllCoordinatesToEvaluate([
    ...currentActiveCoordinates,
  ]);
  let evaluateCount = 0;
  allCoordinatesToEvaluate.forEach((coordinate) => {
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
      activeNeighborCount === 3 ||
      (isCoordinateActive(coordinate) && activeNeighborCount === 2)
    ) {
      newActiveCoordinates.add(coordinate);
    }
    evaluateCount += 1;
    if (evaluateCount % 100 === 0) {
      console.log(`Finished ${evaluateCount}`);
    }
  });

  return newActiveCoordinates;

  function isCoordinateActive(coordinate: Coordinate) {
    return currentActiveCoordinates.has(coordinate);
  }
}

/**
 * Gets all active coordinates and their neighbors and returns an array with
 * no duplicates
 */
export function getAllCoordinatesToEvaluate(activeCoordinates: Coordinate[]) {
  let result: Set<string> = new Set();
  for (const coordinate of activeCoordinates) {
    result.add(coordinate);
    const neighbors = getNeighboringCoordinates(coordinate);
    result = new Set([...result, ...neighbors]);
  }
  return result;
}

export function encodeCoordinateToString(coordinate: Coordinate): string {
  return Object.values(coordinate).join(',');
}

// function encodeCoordinateToObject(
//   coordinateString: string
// ): { w: number; x: number; y: number; z: number } {
//   const coordinateArray = coordinateString.split(',');
//   return {
//     w: Number(coordinateArray[0]),
//     x: Number(coordinateArray[1]),
//     y: Number(coordinateArray[2]),
//     z: Number(coordinateArray[3]),
//   };
// }
