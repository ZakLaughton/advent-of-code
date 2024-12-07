import { getTextInputFromFileInLines } from '../../utils';
import {
  buildLocationGraph,
  findLongestPathToAllLocations,
  findShortestPathToAllLocations,
  parsePaths,
} from './logic';

const input = getTextInputFromFileInLines('./input.txt');
console.log('Part 1 Solution>>>', getPart1Solution(input));
console.log('Part 2 Solution>>>', getPart2Solution(input));

export function getPart1Solution(input: string[]): number {
  const parsedPaths = parsePaths(input);
  const locationGraph = buildLocationGraph(parsedPaths);
  const shortestDistance = findShortestPathToAllLocations(locationGraph);

  return shortestDistance;
}

export function getPart2Solution(input: string[]): number {
  const parsedPaths = parsePaths(input);
  const locationGraph = buildLocationGraph(parsedPaths);
  const longestDistance = findLongestPathToAllLocations(locationGraph);

  return longestDistance;
}
