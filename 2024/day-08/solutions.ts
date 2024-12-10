// const input = getTextInputFromFileInLines('./input.txt');
// console.log('ANSWER>>>', getPart1Solution(input));

import { countAntinodes } from './logic';

export function getPart1Solution(input: string[]): number {
  return countAntinodes(input);
}
