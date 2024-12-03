// Set count to 0
// Process each string, comparing to the rules
// for each string that passes, increase the count

import { getTextInputFromFileInLines, test } from '../../utils';

const ruleSet = [
  hasAtLeast3Vowels,
  hasDoubleLetters,
  doesNotHaveForbiddenStrings,
];

const input = getTextInputFromFileInLines('./input.txt');
console.log('ANSWER>>>', getNumberOfNiceLines(input));

/** FUNCTIONS */
function getNumberOfNiceLines(input: string[]): number {
  let count = 0;
  for (const line of input) {
    if (doesStringFollowRules(line, ruleSet)) count++;
  }
  return count;
}

function doesStringFollowRules(
  input: string,
  rules: ((input: string) => boolean)[]
) {
  for (const rule of rules) {
    if (!rule(input)) return false;
  }
  return true;
}

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

// Checks for forbidden strings for rule: "It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the other requirements."
function doesNotHaveForbiddenStrings(
  input: string,
  forbiddenStrings: string[] = [`ab`, `cd`, `pq`, `xy`]
): boolean {
  for (const forbiddenString of forbiddenStrings) {
    if (input.includes(forbiddenString)) return false;
  }

  return true;
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

console.log('\n\n🧪 Testing doesNotHaveForbiddenStrings');
test(doesNotHaveForbiddenStrings, [`advvasdh`, [`ab`, `cd`, `pq`, `xy`]], true);
test(
  doesNotHaveForbiddenStrings,
  [`advassdahpq`, [`ab`, `cd`, `pq`, `xy`]],
  false
);
test(
  doesNotHaveForbiddenStrings,
  [`advoucdasdh`, [`ab`, `cd`, `pq`, `xy`]],
  false
);
test(
  doesNotHaveForbiddenStrings,
  [`abshshshsh`, [`ab`, `cd`, `pq`, `xy`]],
  false
);

console.log('\n\n🧪 Testing doesStringFollowRules');
test(doesStringFollowRules, [`ugknbfddgicrmopn`, ruleSet], true);
test(doesStringFollowRules, [`aaa`, ruleSet], true);
test(doesStringFollowRules, [`jchzalrnumimnmhp`, ruleSet], false);
test(doesStringFollowRules, [`haegwjzuvuyypxyu`, ruleSet], false);
test(doesStringFollowRules, [`dvszwmarrgswjxmb`, ruleSet], false);
