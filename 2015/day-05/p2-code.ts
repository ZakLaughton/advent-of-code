import { getTextInputFromFileInLines, test } from '../../utils';

const ruleSet = [hasTwoLetterPairs, hasInterrupedRepeat];

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

// Checks the following rule:
// "It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps)."
function hasTwoLetterPairs(input: string): boolean {
  for (let i = 1; i < input.length; i++) {
    const prev = input[i - 1];
    const curr = input[i];
    if (getNumberOfOccurrences(input, prev + curr) >= 2) {
      return true;
    }
  }
  return false;
}

function getNumberOfOccurrences(
  masterString: string,
  testString: string
): number {
  const result = masterString.match(new RegExp(testString, 'g')) || [];
  return result.length;
}

// Checks the following rule:
// "It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa."
function hasInterrupedRepeat(input: string): boolean {
  for (let i = 0; i < input.length; i++) {
    if (input[i + 2] === input[i]) {
      return true;
    }
  }
  return false;
}

/** TESTS */
console.log('\n\n🧪 Testing hasTwoLetterPairs');
test(hasTwoLetterPairs, [`xyxy`], true);
test(hasTwoLetterPairs, [`aabcdefgaa`], true);
test(hasTwoLetterPairs, [`aaa`], false);
test(hasTwoLetterPairs, [`qjhvhtzxzqqjkmpb`], true);
test(hasTwoLetterPairs, [`xxyxx`], true);
test(hasTwoLetterPairs, [`ieodomkazucvgmuy`], false);

console.log('\n\n🧪 Testing getNumberOfOccurrences');
test(getNumberOfOccurrences, [`ieodomkazucvgmuy`, `od`], 1);
test(getNumberOfOccurrences, [`xxyxx`, `xx`], 2);
test(getNumberOfOccurrences, [`aabcdefgaa`, `aa`], 2);

console.log('\n\n🧪 Testing hasInterrupedRepeat');
test(hasInterrupedRepeat, [`abcdefeghi`], true);
test(hasInterrupedRepeat, [`xyx`], true);
test(hasInterrupedRepeat, [`aaa`], true);
test(hasInterrupedRepeat, [`qjhvhtzxzqqjkmpb`], true);
test(hasInterrupedRepeat, [`xxyxx`], true);
test(hasInterrupedRepeat, [`uurcxstgmygtbstg`], false);
