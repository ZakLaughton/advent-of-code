import { rawInput } from './raw-input';
import { countLength } from './logic';
import { getTextInputFromFileInLines } from '../../utils';

const input = getTextInputFromFileInLines('./input.txt');

console.log('Part 1 Partial>>>', getPart1Solution(input, rawInput));
// console.log('Part 2 Solution>>>', getPart2Solution(input));

export function getPart1Solution(input: string[], rawInput: string[]): number {
  let charCountStringLiterals = 0;
  let charCountInMemory = 0;
  for (const line of rawInput) {
    charCountStringLiterals += countLength(line);
  }
  for (const line of input) {
    charCountInMemory += countLength(line);
  }

  return charCountStringLiterals - charCountInMemory;
}

// Answers attempted (and wrong):
// 600

// export function getPart2Solution() {}
