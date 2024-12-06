import { getTextInputFromFileInLines } from '../../utils';
import { countVisitedSpaces } from './guard';

const input = getTextInputFromFileInLines;

// console.log('Part 1 Solution>>>', getPart1Solution(input));
// console.log('Part 2 Solution>>>', getPart2Solution(input));

export function getPart1Solution(input: string): number {
  const numberOfVisitedSpaces = countVisitedSpaces(input);
}

// export function getPart2Solution(input: string): number {

// }
