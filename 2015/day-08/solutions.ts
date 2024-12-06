import { rawInput } from './raw-input';
import { countEncodedLength, countLength, countParsedLength } from './logic';
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
const inputPart2 = getTextInputFromFileInLines('./input-part2.txt');

console.log('Part 1 Solution>>>', getPart1Solution(input, rawInput));
console.log('Part 2 Solution>>>', getPart2Solution(inputPart2, rawInput));

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
/**
 * Part 1 solution:
 *   string literals count: 6195
 *   in memory count: 4845
 *   part 1 answer: 1350
 */

export function getPart2Solution(input: string[], rawInput: string[]): number {
  let charCountEncoded = 0;
  let charCountStringLiterals = 0;

  for (const line of input) {
    charCountEncoded += countEncodedLength(line);
  }
  for (const line of rawInput) {
    charCountStringLiterals += countLength(line);
  }
  console.log('charCountEncoded:', charCountEncoded);
  console.log('charCountStringLiterals:', charCountStringLiterals);

  return charCountEncoded - charCountStringLiterals;
}

/**  Attempted (incorrect) answers:
 * charCountEncoded: 7788
 * charCountStringLiterals: 6195
 * Part 2 Solution>>> 1593
 */
