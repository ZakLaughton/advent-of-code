import { logFunctionTestingHeader, test } from '../../utils';
import { getPart1Solution } from './solutions';

console.log(
  '\n\n***********************\n**** SOLUTIONS TESTING ***\n***********************'
);

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

logFunctionTestingHeader('getPart1Solution()');
test(getPart1Solution, [exampleGrid], 41);
