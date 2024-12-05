import { test } from '../../utils';
import {
  getMiddlePageNumber,
  getValidMiddlePageTotal,
  isPageValid,
  isUpdateValid,
  parseRulesAndUpdatesFromInput,
} from './logic';
import { getPart1Solution } from './solutions';

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

console.log('\n\n🧪 Testing isPageValid');
test(
  isPageValid,
  [{ rules: parsedRulesOutput.rules, startPage: 47, pagesAfter: [61, 53, 29] }],
  true
);
test(
  isPageValid,
  [
    {
      rules: parsedRulesOutput.rules,
      startPage: 97,
      pagesAfter: [61, 53, 29, 13],
    },
  ],
  false
);

console.log('\n\n🧪 Testing getMiddlePageNumber');
test(getMiddlePageNumber, [[75, 47, 61, 53, 29]], 61);
test(getMiddlePageNumber, [[97, 61, 53, 29, 13]], 53);
test(getMiddlePageNumber, [[75, 29, 13]], 29);

console.log(
  '\n\n***********************\n**** PART 2 TESTING ***\n***********************'
);

console.log('\n\n🧪 Testing getPart1Solution');
test(getPart1Solution, [part1TestInput], 61);
