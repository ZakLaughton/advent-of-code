import { test } from '../../utils';
import { getGuardLocation, isInGrid } from './logic';
import { getPart1Solution } from './solutions';

// Copied from https://adventofcode.com/2024/day/6
const exampleGrid = [
  `....#.....`,
  `.........#`,
  `..........`,
  `..#.......`,
  `.......#..`,
  `..........`,
  `.#..^.....`,
  `........#.`,
  `#.........`,
  `......#...`,
];

console.log(
  '\n\n***********************\n**** PART 1 TESTING ***\n***********************'
);
console.log('\n\n🧪 Testing getPart1Solution');
test(getPart1Solution, [exampleGrid], 41);

console.log('\n\n🧪 Testing getGuardLocation');
test(getGuardLocation, [exampleGrid], [6, 4]);

console.log('\n\n🧪 Testing isInGrid');
test(isInGrid, [exampleGrid, [6, 4]], true);
test(isInGrid, [exampleGrid, [10, 4]], false);
test(isInGrid, [exampleGrid, [6, 10]], false);
test(isInGrid, [exampleGrid, [10, 10]], false);

console.log(
  '\n\n***********************\n**** PART 2 TESTING ***\n***********************'
);
