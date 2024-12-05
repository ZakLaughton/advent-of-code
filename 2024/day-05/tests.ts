import { test } from '../../utils';
import {
  fixUpdate,
  getFixedMiddlePageTotal,
  getMiddlePageNumber,
  getValidMiddlePageTotal,
  getFirstInvalidFollowingPage,
  isUpdateValid,
  parseRulesAndUpdatesFromInput,
} from './logic';
import { getPart1Solution, getPart2Solution } from './solutions';

/** TESTS */
const part1TestInput = `47|53
97|13
97|61
13|97

75,47,61,53,29
97,61,53,29,13`;

console.log(
  '\n\n***********************\n**** PART 1 TESTING ***\n***********************'
);
console.log('\n\n🧪 Testing getPart1Solution');
test(getPart1Solution, [part1TestInput], 61);

console.log('\n\n🧪 Testing parseRulesAndUpdatesFromInput');
const parsedRulesOutput = {
  rules: [
    [47, 53],
    [97, 13],
    [97, 61],
    [13, 97],
  ],
  updates: [
    [75, 47, 61, 53, 29],
    [97, 61, 53, 29, 13],
  ],
};
test(parseRulesAndUpdatesFromInput, [part1TestInput], parsedRulesOutput);

console.log('\n\n🧪 Testing getValidMiddlePageTotal');
test(getValidMiddlePageTotal, [parsedRulesOutput], 61);

console.log('\n\n🧪 Testing isUpdateValid');
test(isUpdateValid, [parsedRulesOutput.rules, [75, 47, 61, 53, 29]], true);
test(isUpdateValid, [parsedRulesOutput.rules, [97, 61, 53, 29, 13]], false);

console.log('\n\n🧪 Testing getFirstInvalidFollowingPage');
test(
  getFirstInvalidFollowingPage,
  [{ rules: parsedRulesOutput.rules, startPage: 47, pagesAfter: [61, 53, 29] }],
  null
);
test(
  getFirstInvalidFollowingPage,
  [
    {
      rules: parsedRulesOutput.rules,
      startPage: 97,
      pagesAfter: [61, 53, 29, 13],
    },
  ],
  13
);

console.log('\n\n🧪 Testing getMiddlePageNumber');
test(getMiddlePageNumber, [[75, 47, 61, 53, 29]], 61);
test(getMiddlePageNumber, [[97, 61, 53, 29, 13]], 53);
test(getMiddlePageNumber, [[75, 29, 13]], 29);

console.log(
  '\n\n***********************\n**** PART 2 TESTING ***\n***********************'
);
// Copied directly from exmample on page
const part2TestInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;
const part2ParsedTestInput = {
  rules: [
    [47, 53],
    [97, 13],
    [97, 61],
    [97, 47],
    [75, 29],
    [61, 13],
    [75, 53],
    [29, 13],
    [97, 29],
    [53, 29],
    [61, 53],
    [97, 53],
    [61, 29],
    [47, 13],
    [75, 47],
    [97, 75],
    [47, 61],
    [75, 61],
    [47, 29],
    [75, 13],
    [53, 13],
  ],
  updates: [
    [75, 47, 61, 53, 29],
    [97, 61, 53, 29, 13],
    [75, 29, 13],
    [75, 97, 47, 61, 53],
    [61, 13, 29],
    [97, 13, 75, 29, 47],
  ],
};

console.log('\n\n🧪 Testing getPart2Solution');
test(getPart2Solution, [part2TestInput], 123);

console.log('\n\n🧪 Testing getFixedMiddlePageTotal');
test(getFixedMiddlePageTotal, [part2ParsedTestInput], 123);

console.log('\n\n🧪 Testing fixUpdate');
test(
  fixUpdate,
  [part2ParsedTestInput.rules, [75, 97, 47, 61, 53]],
  [97, 75, 47, 61, 53]
);
test(fixUpdate, [part2ParsedTestInput.rules, [61, 13, 29]], [61, 29, 13]);
test(
  fixUpdate,
  [part2ParsedTestInput.rules, [97, 13, 75, 29, 47]],
  [97, 75, 47, 29, 13]
);
test(
  fixUpdate,
  [
    [
      [47, 97],
      [61, 47],
    ],
    [75, 97, 47, 61, 53],
  ],
  [75, 61, 47, 97, 53]
);
