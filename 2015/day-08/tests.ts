import { test } from '../../utils';
import { getPart1Solution } from './logic';

console.log(
  '\n\n***********************\n**** PART 1 TESTING ***\n***********************'
);
const part1TestInput = [
  String.raw`""`,
  String.raw`"abc"`,
  String.raw`"aaa\"aaa"`,
  String.raw`"\x27"`,
];
console.log('\n\n🧪 Testing getPart1Solution');
test(getPart1Solution, [part1TestInput], 12);
