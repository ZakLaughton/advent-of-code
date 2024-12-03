// Set count to 0
// Process each string, comparing to the rules
// for each string that passes, increase the count

import { test } from '../../utils';

/** FUNCTIONS */
function hasAtLeast3Vowels(input: string): boolean {
  let count = 0;
  const vowels = 'aeiou';
  for (const char of input) {
    if (vowels.includes(char)) count++;
    if (count === 3) return true;
  }
  return false;
}

/** TESTS */
console.log('\n\n🧪 Testing hasAtLeast3Vowels');
test(hasAtLeast3Vowels, [`advasdh`], false);
test(hasAtLeast3Vowels, [`advasdah`], true);
test(hasAtLeast3Vowels, [`advouasdh`], true);
test(hasAtLeast3Vowels, [`shshshsh`], false);
