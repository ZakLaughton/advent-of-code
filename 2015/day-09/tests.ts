import {
  getTextInputFromFileInLines,
  logFunctionTestingHeader,
  test,
} from '../../utils';
import { getAllLocations, parsePaths } from './logic';
import { getPart1Solution } from './solutions';

// Copied from https://adventofcode.com/2015/day/9
const exampleInput = getTextInputFromFileInLines('./exampleInput.txt');

logFunctionTestingHeader('getPart1Solution()');
test(getPart1Solution, [exampleInput], 605);

logFunctionTestingHeader('parsePaths()');
test(
  parsePaths,
  [exampleInput],
  [
    { start: 'London', end: 'Dublin', distance: 464 },
    { start: 'London', end: 'Belfast', distance: 518 },
    { start: 'Dublin', end: 'Belfast', distance: 141 },
  ]
);

logFunctionTestingHeader('getAllLocations()');
test(
  getAllLocations,
  [
    [
      { start: 'London', end: 'Dublin', distance: 464 },
      { start: 'London', end: 'Belfast', distance: 518 },
      { start: 'Dublin', end: 'Belfast', distance: 141 },
    ],
  ],
  ['London', 'Dublin', 'Belfast']
);
