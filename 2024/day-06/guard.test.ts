import { logFunctionTestingHeader, test } from '../../utils';
import { Grid } from './grid';
import {
  areStopLocationsLooping,
  findLoopingObstructions,
  getGuardLocation,
  getVisitedLocations,
  patrol,
  turnRight,
} from './guard';

// Copied from https://adventofcode.com/2024/day/6
const exampleGrid: Grid = [
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
const loopingExampleGrid: Grid = [`.#...`, `....#`, `#^...`, `...#.`];

console.log(
  '\n\n***********************\n**** GUARD TESTING ***\n***********************'
);

logFunctionTestingHeader('getVisitedLocations()');
// Make sure it stops if there's a loop
test(
  getVisitedLocations,
  [loopingExampleGrid],
  [
    [2, 1],
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 3],
    [2, 2],
    [2, 1],
    [1, 1],
  ]
);

logFunctionTestingHeader('areStopLocationsLooping()');
test(
  areStopLocationsLooping,
  [
    [
      [2, 1],
      [1, 1],
      [1, 3],
      [2, 3],
      [2, 1],
    ],
  ],
  true
);
test(
  areStopLocationsLooping,
  [
    [
      [4, 1],
      [1, 1],
      [1, 3],
      [3, 3],
      [3, 1],
    ],
  ],
  false
);
test(
  areStopLocationsLooping,
  [
    [
      [4, 1],
      [1, 1],
      [1, 3],
    ],
  ],
  false
);

logFunctionTestingHeader('getGuardLocation()');
test(getGuardLocation, [exampleGrid], [6, 4]);

logFunctionTestingHeader('patrol()');
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
    endingDirection: 'down',
  }
);

logFunctionTestingHeader('turnRight()');
test(turnRight, ['up'], 'right');
test(turnRight, ['right'], 'down');
test(turnRight, ['down'], 'left');
test(turnRight, ['left'], 'up');

logFunctionTestingHeader('findLoopingObstructions()');
test(
  findLoopingObstructions,
  [exampleGrid],
  [
    [6, 3],
    [7, 6],
    [7, 7],
    [8, 1],
    [8, 3],
    [9, 7],
  ]
);
