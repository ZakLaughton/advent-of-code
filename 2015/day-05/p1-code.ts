// Set count to 0
// Process each string, comparing to the rules
// for each string that passes, increase the count

import { test } from '../../utils';

/** FUNCTIONS */

// Checks rule "It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou."
function hasAtLeast3Vowels(input: string): boolean {
  let count = 0;
  const vowels = 'aeiou';
  for (const char of input) {
    if (vowels.includes(char)) count++;
    if (count === 3) return true;
  }
  return false;
}

// Checks rule "It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd)."
function hasDoubleLetters(input: string): boolean {
  for (let i = 1; i < input.length; i++) {
    const prev = input[i - 1];
    const curr = input[i];
    if (prev === curr) return true;
  }

  return false;
}

/** TESTS */
console.log('\n\n🧪 Testing hasAtLeast3Vowels');
test(hasAtLeast3Vowels, [`advasdh`], false);
test(hasAtLeast3Vowels, [`advasdah`], true);
test(hasAtLeast3Vowels, [`advouasdh`], true);
test(hasAtLeast3Vowels, [`shshshsh`], false);

console.log('\n\n🧪 Testing hasDoubleLetters');
test(hasDoubleLetters, [`advvasdh`], true);
test(hasDoubleLetters, [`advassdah`], true);
test(hasDoubleLetters, [`advouasdh`], false);
test(hasDoubleLetters, [`shshshsh`], false);
