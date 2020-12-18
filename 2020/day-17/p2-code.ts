// TODO idea: translate all objects to strings for easier comparison. See https://nopaste.ml/?l=js#XQAAAQBcCAAAAAAAAAAXin1KR4VVQayM1aKtS5aWizOAfuC2YtVJgJqxEs4OQ4fvJl9MgLNVb8QHvkseqa3Dd42wTWrpUi61FWKvn7WV9asNaK0932MqzsIYDTGJdHo3RVsvnfmGvuSSo72OOJppF62VxYDlHAgo/okt59+j+th37kYzxcill7W0/qYEbPTCYWaAmDpO8kxklGOXAh2HMdqb7gqtWaQrFkz6cUh3EgU6Xzs9nrHjJxr0Ia1CnQoeANq828hgfFCvTZu2IePf9WvShHT67Wb6weqx80SZqNkXhFgWNALU74lsKxc1ZwLI0mrwu+7P1Fno29WA8O6qzJ74OOVaQAHDZrYuNvrL3gFBqG1ujlRiXMI5kvTi3iRRiqz0gKJMdUPIuUfLiII9K2vzPiB3MDJdl6sKK8nRjfA+u6XynunWKD0NnqKE86oWjoNi4oGVUp2ca9bKG52SeWjVZwq2jml3mLOPY77XNwAyweZaAb8l+gu4iovtEGud9C3GnK8edHhRlYKmJceyrhRFS3+gatt8BNXsoUHrFqIWwfUHwS0p+Xa3Tqjv+s3LB+rHyPcGMJPR9iLR1YUz4AyEyCilggQjUmFWGuFb/7bESbHHdTlZq5Jy61M78sdlNzv/OtG9EbyMmyngyZFL3WGiePuv9J6ZvYrhW9RyA2+LB4dhIx+YoCq2xq/Di+cEsx1G3rC4DCDfuBW4cV/fW7xgBxwoOvzXi+kQX+YCzoq5D7ofDXVEuFyWP083u8npIBgoFqT09McWmdqhjOwFhEBLpqLeLDiNc12r50QoXkcv1p5HNh00HGUIm1j4jRTnugt9JwuLgiD78P0YZBiMIA4HWe9qlGPOXMnuGrBSUEigVUsMFEWVOhgijXVW6dTBY9hcm8DrxCr4gR3HJdjdymHOZzgErez21Dd4Z9WDQ3GEiIN8xNGowS5fWQ/qV7lY/x0+7sv6esytvrvflrC/CUwG1bmpWRWX1ANx+FbWEXTrqP/1FgMY

const {
  getInputByLine,
  removeDuplicateObjectsFromArray,
} = require('../../utils');
const isEqual = require('lodash/isEqual');

// @ts-ignore
const INPUT_LINES = getInputByLine(__dirname, 'p1-input.txt');
interface Coordinate {
  w: number;
  x: number;
  y: number;
  z: number;
}

getAnswer();

function getAnswer(inputLines: string[] = INPUT_LINES) {
  const initialActiveCoordinates = getActiveCoordinatesFromInputLines(
    inputLines
  );

  let currentActiveCoordinates = initialActiveCoordinates;
  for (let i = 0; i < 6; i++) {
    console.log(
      `Running iteration number ${i} with ${currentActiveCoordinates.length} possibilities`
    );
    currentActiveCoordinates = getActiveCoordinatesAfterNextCycle(
      currentActiveCoordinates
    );
    console.log(
      `Total for iteration number ${i}:`,
      currentActiveCoordinates.length
    );
  }
  console.log('Answer>>>', currentActiveCoordinates.length);
}

function getActiveCoordinatesFromInputLines(inputLines: string[]) {
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

function getNeighboringCoordinates(coordinate: Coordinate) {
  const result: Coordinate[] = [];
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

function getActiveCoordinatesAfterNextCycle(
  currentActiveCoordinates: Coordinate[]
) {
  const newActiveCoordinates: Coordinate[] = [];
  console.log(
    'newActiveCoordinates length>>>',
    currentActiveCoordinates.length
  );
  console.log('start');
  let allCoordinatesToEvaluate = getAllCoordinatesToEvaluate(
    currentActiveCoordinates
  );
  console.log('end');
  for (
    let coordinateIndex = 0;
    coordinateIndex < allCoordinatesToEvaluate.length;
    coordinateIndex++
  ) {
    let activeNeighborCount = 0;
    const neighbors = getNeighboringCoordinates(
      allCoordinatesToEvaluate[coordinateIndex]
    );
    for (const neighbor of neighbors) {
      if (isCoordinateActive(neighbor)) {
        activeNeighborCount += 1;
      }
      // No further changes happen after 4 active neighbors
      if (activeNeighborCount === 4) {
        break;
      }
    }
    if (coordinateIndex % 100 === 0) {
      console.log(
        `Finished evaluating neighbors for ${coordinateIndex} of ${allCoordinatesToEvaluate.length}`
      );
    }

    if (
      activeNeighborCount === 3 ||
      (isCoordinateActive(allCoordinatesToEvaluate[coordinateIndex]) &&
        activeNeighborCount < 2)
    ) {
      newActiveCoordinates.push(allCoordinatesToEvaluate[coordinateIndex]);
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
function getAllCoordinatesToEvaluate(activeCoordinates: Coordinate[]) {
  let result: Coordinate[] = [];
  for (const coordinate of activeCoordinates) {
    const neighbors = getNeighboringCoordinates(coordinate);
    result = result.concat([coordinate], neighbors);
  }
  const unduplicated = removeDuplicateObjectsFromArray(result);
  console.log('result:', result.length, 'unduplicated:', unduplicated.length);
  return unduplicated;
}

module.exports = {
  getAnswer,
  getActiveCoordinatesAfterNextCycle,
  getActiveCoordinatesFromInputLines,
  getAllCoordinatesToEvaluate,
  getNeighboringCoordinates,
};

export { Coordinate };
