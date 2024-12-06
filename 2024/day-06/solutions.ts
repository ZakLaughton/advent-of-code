import { getTextInputFromFileInLines } from '../../utils';
import { Grid } from './grid';
import { countVisitedSpaces } from './guard';

const input = getTextInputFromFileInLines('./input.txt');

console.log('Part 1 Solution>>>', getPart1Solution(input));
// console.log('Part 2 Solution>>>', getPart2Solution(input));

export function getPart1Solution(grid: Grid): number {
  return countVisitedSpaces(grid);
}

// export function getPart2Solution(input: string): number {

// }
