import {
  getTextInputFromFileInLines,
  logFunctionTestingHeader,
  test,
} from '../../utils';
import {
  buildLocationGraph,
  findLongestPathToAllLocations,
  findShortestPathToAllLocations,
  parsePaths,
} from './logic';
import { getPart1Solution, getPart2Solution } from './solutions';

// Copied from https://adventofcode.com/2015/day/9
const exampleInput = getTextInputFromFileInLines('./exampleInput.txt');
const exampleGraph = new Map([
  [
    'London',
    [
      { neighbor: 'Dublin', distance: 464 },
      { neighbor: 'Belfast', distance: 518 },
    ],
  ],
  [
    'Dublin',
    [
      { neighbor: 'London', distance: 464 },
      { neighbor: 'Belfast', distance: 141 },
    ],
  ],
  [
    'Belfast',
    [
      { neighbor: 'London', distance: 518 },
      { neighbor: 'Dublin', distance: 141 },
    ],
  ],
]);

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

logFunctionTestingHeader('buildLocationGraph()');
test(
  buildLocationGraph,
  [
    [
      { start: 'London', end: 'Dublin', distance: 464 },
      { start: 'London', end: 'Belfast', distance: 518 },
      { start: 'Dublin', end: 'Belfast', distance: 141 },
    ],
  ],
  exampleGraph
);

logFunctionTestingHeader('findShortestPathToAllLocations()');
test(findShortestPathToAllLocations, [exampleGraph], 605);

logFunctionTestingHeader('getPart2Solution()');
test(getPart2Solution, [exampleInput], 982);

logFunctionTestingHeader('findLongestPathToAllLocations()');
test(findLongestPathToAllLocations, [exampleGraph], 982);
