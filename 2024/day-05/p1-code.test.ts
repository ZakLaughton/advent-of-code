import { test } from '../../utils';
import {
  getMiddlePageNumber,
  getMiddlePageTotal,
  getPart1Solution,
  isPageValid,
  isUpdateValid,
  parseRulesAndUpdatesFromInput,
} from './get-solutions';

/** TESTS */
const testInput = `47|53
97|13
97|61
13|97

75,47,61,53,29
97,61,53,29,13`;

console.log('\n\n🧪 Testing getSolution');
test(getPart1Solution, [testInput], 61);

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
test(parseRulesAndUpdatesFromInput, [testInput], parsedRulesOutput);

console.log('\n\n🧪 Testing getMiddlePageTotal');
test(getMiddlePageTotal, [parsedRulesOutput], 61);

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
