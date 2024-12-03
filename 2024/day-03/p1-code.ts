import { getTextInputFromFile, test } from '../../utils';

const input = getTextInputFromFile('p1-input.txt');
const mulRegEx = /mul\(\d+,\d+\)/g;
console.log('Answer>>>', addAllValidMultiplicationResults(input));

/** FUNCTIONS */

// Adds the result of all valid multiplication operations in the input
function addAllValidMultiplicationResults(input: string): number {
  const mulStrings = getAllMatchesFromString(input, mulRegEx);
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

/** TESTS */

test(
  addAllValidMultiplicationResults,
  ['xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'],
  161
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
