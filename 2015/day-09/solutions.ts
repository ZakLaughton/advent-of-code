// console.log('Part 1 Solution>>>', getPart1Solution(input));
// console.log('Part 2 Solution>>>', getPart2Solution(input));

import { getAllLocations, parsePaths } from './logic';

export function getPart1Solution(input: string): number {
  const parsedPaths = parsePaths(input);
  const locations = getAllLocations(parsedPaths);

  //   [
  //     { start: 'London', end: 'Dublin', distance: 464 },
  //     { start: 'London', end: 'Belfast', distance: 518 },
  //     { start: 'Dublin', end: 'Belfast', distance: 141 },
  //   ]
}

// export function getPart2Solution(input: string): number {

// }
