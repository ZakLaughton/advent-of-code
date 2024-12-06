import { getTextInputFromFileInLines, test } from '../../utils';
import { countEncodedLength, countLength, countParsedLength } from './logic';
import { getPart1Solution, getPart2Solution } from './solutions';

console.log(
  '\n\n***********************\n**** PART 1 TESTING ***\n***********************'
);
const part1TestInput = [
  [``, `abc`, `aaa\"aaa`, `\x27`],
  [
    String.raw`""`,
    String.raw`"abc"`,
    String.raw`"aaa\"aaa"`,
    String.raw`"\x27"`,
  ],
];

console.log('\n\n🧪 Testing getPart1Solution');
test(getPart1Solution, part1TestInput, 12);

console.log('\n\n🧪 Testing countLength');
test(countLength, [String.raw`""`], 2);
test(countLength, [String.raw`"abc"`], 5);
test(countLength, [String.raw`"aaa\"aaa"`], 10);
test(countLength, [String.raw`"\x27"`], 6);

console.log('\n\n🧪 Testing countParsedLength');
const testInput = getTextInputFromFileInLines('./test-input.txt');
test(countParsedLength, [testInput[0]], 0);
test(countParsedLength, [testInput[1]], 3);
test(countParsedLength, [testInput[2]], 7);
test(countParsedLength, [testInput[3]], 1);

console.log(
  '\n\n***********************\n**** PART 2 TESTING ***\n***********************'
);

const part2TestInput = [
  testInput,
  [
    String.raw`""`,
    String.raw`"abc"`,
    String.raw`"aaa\"aaa"`,
    String.raw`"\x27"`,
  ],
];

console.log('\n\n🧪 Testing getPart1Solution');
test(getPart2Solution, part2TestInput, 19);

console.log('\n\n🧪 Testing countEncodedLength');
test(countEncodedLength, [testInput[0]], 6);
test(countEncodedLength, [testInput[1]], 9);
test(countEncodedLength, [testInput[2]], 16);
test(countEncodedLength, [testInput[3]], 11);
