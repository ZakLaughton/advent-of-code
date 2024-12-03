// @ts-nocheck
import {
  getTextInputFromFile,
  getTextInputFromFileInLines,
  test,
} from '../../utils';

const input = getTextInputFromFileInLines('./p1-input.txt');

console.log('ANSWER>>>', calculateTotalNeededPaper(input));

/** FUNCTIONS */
function calculateTotalNeededPaper(input: string[]): number {
  let runningTotal = 0;
  for (const gift of input) {
    runningTotal += getNeededPaper(gift.split('x'));
  }
  return runningTotal;
}

function getNeededPaper(dimensions: number[]): number {
  const length = dimensions[0];
  const width = dimensions[1];
  const height = dimensions[2];
  const surfaceArea =
    2 * length * width + 2 * length * height + 2 * height * width;

  // Get area of the smallest side
  const twoSmallestEdges: number[] = [length, width, height]
    .sort((a, b) => a - b)
    .slice(0, 2);
  const smallestSideArea = twoSmallestEdges[0] * twoSmallestEdges[1];
  return surfaceArea + smallestSideArea;
}

/** TESTS */

test(getNeededPaper, [[2, 3, 4]], 58);
test(getNeededPaper, [[1, 1, 10]], 43);
