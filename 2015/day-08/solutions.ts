import { rawInput } from './raw-input';
import { countLength, countParsedLength } from './logic';
import { getTextInputFromFileInLines } from '../../utils';

// Prework required for input
// Replace all hexadecimal escaped characters in input.txt manually
// with a dummy character before running.
// I used the following regex:
//   find: \\x[0-9abcdef]{2}
//   replace: z
//
// Reason: JavaScript has a hard time parsing these for whatever
// reason. So manually removing them and replacing them with a single
// character is a way to get the count right.

const input = getTextInputFromFileInLines('./input.txt');

console.log('Part 1 Solution>>>', getPart1Solution(input, rawInput));
// console.log('Part 2 Solution>>>', getPart2Solution(input));

export function getPart1Solution(input: string[], rawInput: string[]): number {
  let charCountStringLiterals = 0;
  let charCountInMemory = 0;
  for (const line of rawInput) {
    charCountStringLiterals += countLength(line);
  }
  for (const line of input) {
    charCountInMemory += countParsedLength(line);
  }

  console.log('charCountStringLiterals:', charCountStringLiterals);
  console.log('charCountInMemory:', charCountInMemory);

  return charCountStringLiterals - charCountInMemory;
}
