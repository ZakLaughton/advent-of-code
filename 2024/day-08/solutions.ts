import { getTextInputFromFileInLines } from '../../utils';
import { countAntinodes, countAntinodesWithHarmonics } from './logic';

const input = getTextInputFromFileInLines('./input.txt');
console.log('PART 1 ANSWER>>>', getPart1Solution(input));
console.log('PART 2 ANSWER>>>', getPart2Solution(input));

export function getPart1Solution(input: string[]): number {
  return countAntinodes(input);
}

export function getPart2Solution(input: string[]): number {
  return countAntinodesWithHarmonics(input);
}
