import { test } from '../../utils';
import {
  countInMemoryChars,
  countStringLiteralChars,
  getPart1Solution,
  unescapeString,
} from './logic';

console.log(
  '\n\n***********************\n**** PART 1 TESTING ***\n***********************'
);
const part1TestInput = [`""`, `"abc"`, `"aaa\"aaa"`, `"\x27"`];

console.log('\n\n🧪 Testing getPart1Solution');
test(getPart1Solution, [part1TestInput], 12);

console.log('\n\n🧪 Testing countStringLiteralChars');
test(countStringLiteralChars, [String.raw`""`], 2);
test(countStringLiteralChars, [String.raw`"abc"`], 5);
test(countStringLiteralChars, [String.raw`"aaa\"aaa"`], 10);
test(countStringLiteralChars, [String.raw`"\x27"`], 6);

console.log('\n\n🧪 Testing countInMemoryChars');
test(countInMemoryChars, [String.raw`""`], 0);
test(countInMemoryChars, [String.raw`"abc"`], 3);
test(countInMemoryChars, [String.raw`"aaa\"aaa"`], 7);
test(countInMemoryChars, [String.raw`"\xe4"`], 1);
