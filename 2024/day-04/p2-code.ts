import { getTextInputFromFileInLines, test } from '../../utils';

const input = getTextInputFromFileInLines('./input.txt');
console.log('ANSWER>>>', countMasXs(input));

/** FUNCTIONS */

// Finds all X-MAS-es in an ex with the pattern below (periods represent any other letters)
// M.S
// .A.
// M.S
function countMasXs(input: string[]) {
  let count = 0;
  for (const [rowIndex, row] of input.entries()) {
    let letterIndex = 0;
    for (let i = 0; i < row.length; i++) {
      if (isAMasX(input, [rowIndex, letterIndex])) {
        count++;
      }
      letterIndex++;
    }
  }
  return count;
}

// Given a coordinate, it checks if it is at the center of an X-MAS in the map
function isAMasX(letterMap: string[], centerCoordinates: number[]): boolean {
  if (letterMap[centerCoordinates[0]][centerCoordinates[1]] !== 'A')
    return false;
  if (isOnEdge(letterMap, centerCoordinates)) return false;
  // Provides the way for each direction to move
  const directionDelta = {
    upLeft: [-1, -1],
    upRight: [-1, 1],
    downLeft: [1, -1],
    downRight: [1, 1],
  };

  const xUpLeftCoordinate = [
    centerCoordinates[0] + directionDelta.upLeft[0],
    centerCoordinates[1] + directionDelta.upLeft[1],
  ];
  const xUpRightCoordinate = [
    centerCoordinates[0] + directionDelta.upRight[0],
    centerCoordinates[1] + directionDelta.upRight[1],
  ];
  const xDownLeftCoordinate = [
    centerCoordinates[0] + directionDelta.downLeft[0],
    centerCoordinates[1] + directionDelta.downLeft[1],
  ];
  const xDownRightCoordinate = [
    centerCoordinates[0] + directionDelta.downRight[0],
    centerCoordinates[1] + directionDelta.downRight[1],
  ];

  const xUpLeftLetter = letterMap[xUpLeftCoordinate[0]][xUpLeftCoordinate[1]];
  const xUpRightLetter =
    letterMap[xUpRightCoordinate[0]][xUpRightCoordinate[1]];
  const xDownLeftLetter =
    letterMap[xDownLeftCoordinate[0]][xDownLeftCoordinate[1]];
  const xDownRightLetter =
    letterMap[xDownRightCoordinate[0]][xDownRightCoordinate[1]];

  if (
    xUpLeftLetter !== xDownRightLetter &&
    xDownLeftLetter !== xUpRightLetter &&
    'MS'.includes(xUpLeftLetter) &&
    'MS'.includes(xUpRightLetter) &&
    'MS'.includes(xDownLeftLetter) &&
    'MS'.includes(xDownRightLetter)
  ) {
    return true;
  }

  return false;
}

// Checks if a given coordinate is on the edge of a wordMap
function isOnEdge(letterMap: string[], coordinates: number[]): boolean {
  const rowIndex = coordinates[0];
  const letterIndex = coordinates[1];
  if (
    rowIndex === 0 ||
    rowIndex === letterMap.length - 1 ||
    letterIndex === 0 ||
    letterIndex === letterMap[rowIndex].length - 1
  ) {
    return true;
  }
  return false;
}

/** TESTS */

// This input is copied from the example and is known to have 9 X-MASes
const testWordMapInput = [
  'MMMSXXMASM',
  'MSAMXMSMSA',
  'AMXSXMAAMM',
  'MSAMASMSMX',
  'XMASAMXAMM',
  'XXAMMXXAMA',
  'SMSMSASXSS',
  'SAXAMASAAA',
  'MAMMMXMMMM',
  'MXMXAXMASX',
];

console.log('🧪 Testing countMasXs');
test(countMasXs, [testWordMapInput], 9);

console.log('🧪 Testing isAMasX');
test(isAMasX, [testWordMapInput, [1, 2]], true);
test(isAMasX, [testWordMapInput, [0, 0]], false);
test(isAMasX, [testWordMapInput, [2, 7]], true);
test(isAMasX, [testWordMapInput, [5, 5]], false);

console.log('🧪 Testing isOnEdge');
test(isOnEdge, [testWordMapInput, [0, 0]], true);
test(isOnEdge, [testWordMapInput, [3, 4]], false);
test(isOnEdge, [testWordMapInput, [9, 9]], true);
