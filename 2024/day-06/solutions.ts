import { getTextInputFromFileInLines } from '../../utils';
import { Grid } from './grid';
import { findLoopingObstructions, getVisitedLocations } from './guard';

const input = getTextInputFromFileInLines('./input.txt');

console.log('Part 1 Solution>>>', getPart1Solution(input));
console.log('Part 2 Solution>>>', getPart2Solution(input));

export function getPart1Solution(grid: Grid): number {
  const visitedLocations = getVisitedLocations(grid);
  const uniqueVisitedLocations = new Set();
  for (const location of visitedLocations) {
    uniqueVisitedLocations.add(JSON.stringify(location));
  }
  return uniqueVisitedLocations.size - 1;
}

export function getPart2Solution(grid: Grid): number {
  /**
   * # Brainstorming the approach
   *
   * ## Mathematical approach
   * Row/column requirements, based on previous
   * .#... [0,1] 1 [r<2, c=2]
   * ....# [1,4] 2 [r=1, c>1]
   * #^... [2,0] 4 [r=2, c<3]
   * ...#. [3,3] 3 [r>1, c=3]
   *
   * Thought: if you can find 3 obstructions that fit these
   * requirements, you can find a fourth and see if its on the path
   *
   * ## Brute force approach
   * For each location on the path
   *  add an obstruction and test
   * To test:
   *  count = 0
   *  send the guard thru
   *  if they leave the grid, continue
   *  if they reach a location that they were at 4 moves ago, count += 1
   *
   * ^ This feels more straightforward. Doing this for now
   *
   */
  const visitedLocationsOnClearPath = getVisitedLocations(grid);
  //   console.log(
  //     '🚀 ~ getPart2Solution ~ visitedLocationsOnClearPath:',
  //     visitedLocationsOnClearPath
  //   );

  const loopingObstructions = findLoopingObstructions(
    grid,
    visitedLocationsOnClearPath
  );

  return loopingObstructions.length;
}
