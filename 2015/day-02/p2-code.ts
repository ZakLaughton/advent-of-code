// @ts-nocheck
import {
  getTextInputFromFile,
  getTextInputFromFileInLines,
  test,
} from '../../utils';

const input = getTextInputFromFileInLines('./p1-input.txt');

console.log('ANSWER>>>', calculateTotalNeededRibbon(input));

/** FUNCTIONS */
function calculateTotalNeededRibbon(input: string[]): number {
  let runningTotal = 0;
  for (const gift of input) {
    runningTotal += getNeededRibbon(gift.split('x'));
  }
  return runningTotal;
}

function getNeededRibbon(dimensions: number[]): number {
  const length = dimensions[0];
  const width = dimensions[1];
  const height = dimensions[2];

  const twoSmallestEdges: number[] = [length, width, height]
    .sort((a, b) => a - b)
    .slice(0, 2);

  const perimeterOfSmallestSide =
    2 * twoSmallestEdges[0] + 2 * twoSmallestEdges[1];

  const volume = length * width * height;

  return perimeterOfSmallestSide + volume;
}

/** TESTS */

test(getNeededRibbon, [[2, 3, 4]], 34);
test(getNeededRibbon, [[1, 1, 10]], 14);
