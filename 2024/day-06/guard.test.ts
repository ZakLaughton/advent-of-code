import { logFunctionTestingHeader, test } from '../../utils';
import { getGuardLocation, patrol, turnRight } from './guard';
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
  '\n\n***********************\n**** GUARD TESTING ***\n***********************'
);
logFunctionTestingHeader('getPart1Solution');
// test(getPart1Solution, [exampleGrid], 41);

logFunctionTestingHeader('getGuardLocation');
test(getGuardLocation, [exampleGrid], [6, 4]);

logFunctionTestingHeader('patrol');
// Test 4 directions
test(
  patrol,
  [{ grid: exampleGrid, startingLocation: [6, 4], startingDirection: 'up' }],
  {
    endingLocation: [1, 4],
    endingDirection: 'right',
  }
);
test(
  patrol,
  [{ grid: exampleGrid, startingLocation: [1, 4], startingDirection: 'right' }],
  {
    endingLocation: [1, 8],
    endingDirection: 'down',
  }
);
test(
  patrol,
  [{ grid: exampleGrid, startingLocation: [1, 8], startingDirection: 'down' }],
  {
    endingLocation: [6, 8],
    endingDirection: 'left',
  }
);
test(
  patrol,
  [{ grid: exampleGrid, startingLocation: [6, 8], startingDirection: 'left' }],
  {
    endingLocation: [6, 2],
    endingDirection: 'up',
  }
);
// Test moving out of bounds
test(
  patrol,
  [{ grid: exampleGrid, startingLocation: [7, 7], startingDirection: 'down' }],
  {
    endingLocation: [10, 7],
    endingDirection: 'up',
  }
);

logFunctionTestingHeader('turnRight()');
test(turnRight, ['up'], 'right');
test(turnRight, ['right'], 'down');
test(turnRight, ['down'], 'left');
test(turnRight, ['left'], 'up');
