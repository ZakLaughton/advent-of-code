import { getTextInputFromFileInLines } from '../../utils';
import { Grid } from './grid';
import { getVisitedLocations } from './guard';

const input = getTextInputFromFileInLines('./input.txt');

console.log('Part 1 Solution>>>', getPart1Solution(input));
// console.log('Part 2 Solution>>>', getPart2Solution(input));

export function getPart1Solution(grid: Grid): number {
  const visitedLocations = getVisitedLocations(grid);
  const uniqueVisitedLocations = new Set();
  for (const location of visitedLocations) {
    uniqueVisitedLocations.add(JSON.stringify(location));
  }
  return uniqueVisitedLocations.size;
}

// export function getPart2Solution(input: string): number {

// }
