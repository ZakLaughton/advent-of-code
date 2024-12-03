// @ts-nocheck

import { getTextInputFromFile, test } from '../../utils';

const input = getTextInputFromFile('p1-input.txt');
const mulRegEx = /mul\(\d{1,3},\d{1,3}\)/g;
console.log('Answer>>>', addAllValidMultiplicationResults(input));

/** FUNCTIONS */
// Adds the result of all valid multiplication operations in the input
function addAllValidMultiplicationResults(input: string): number {
  const validInput = removeDontSections(input);
  const mulStrings = getAllMatchesFromString(validInput, mulRegEx);
  let total = 0;
  for (const mulString of mulStrings) {
    total += multiplyFromMulString(mulString);
  }
  return total;
}

// Return all matches of a regex in a string
function getAllMatchesFromString(input: string, regex: RegExp): string[] {
  const matches = [];
  let match;
  while ((match = regex.exec(input))) {
    matches.push(match[0]);
  }
  return matches;
}

// Multiply two numbers from a string like 'mul(2,4)'
function multiplyFromMulString(mulString: string): number {
  const [a, b] = mulString
    .replace('mul(', '')
    .replace(')', '')
    .split(',')
    .map(Number);
  return a * b;
}

// Returns a string with "don't" sections removed
function removeDontSections(input: string): string {
  const oneLineInput = input.replace(/\n/g, '');
  const dontSectionRegex = /don't\(\).*?(?=(do\(\)|$))/g;
  return oneLineInput.replace(dontSectionRegex, '');
}

/** TESTS */

test(
  addAllValidMultiplicationResults,
  [
    `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))don't()abcdo()mul(1,2)`,
  ],
  50
);
test(
  addAllValidMultiplicationResults,
  [`xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`],
  48
);
test(
  addAllValidMultiplicationResults,
  [
    `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))don't()abcdo()mul(1,2)don't()mul(3,5)`,
  ],
  50
);
test(getAllMatchesFromString, ['abcabcabc', /abc/g], ['abc', 'abc', 'abc']);
test(
  getAllMatchesFromString,
  [
    'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))',
    mulRegEx,
  ],
  ['mul(2,4)', 'mul(5,5)', 'mul(11,8)', 'mul(8,5)']
);
test(multiplyFromMulString, ['mul(2,4)'], 8);
test(multiplyFromMulString, ['mul(23,44)'], 1012);
test(
  removeDontSections,
  [`xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`],
  `xmul(2,4)&mul[3,7]!^do()?mul(8,5))`
);
test(
  removeDontSections,
  [
    `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))don't()abcdo()mul(1,2)`,
  ],
  `xmul(2,4)&mul[3,7]!^do()?mul(8,5))do()mul(1,2)`
);
test(
  removeDontSections,
  [
    `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))don't()abcdo()mul(1,2)don't()mul(3,5)`,
  ],
  `xmul(2,4)&mul[3,7]!^do()?mul(8,5))do()mul(1,2)`
);
test(
  removeDontSections,
  [
    `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))don't()abcdo()mul(1,2)don't()mul(3,5)
mul(2,4)`,
  ],
  `xmul(2,4)&mul[3,7]!^do()?mul(8,5))do()mul(1,2)`
);
