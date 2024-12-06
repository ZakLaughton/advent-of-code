import { logFunctionTestingHeader, test } from '../../utils';
import {
  getAllPositionsBetweenCoordinates,
  getNextLocation,
  isInGrid,
} from './grid';

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
  '\n\n***********************\n**** GRID TESTING ***\n***********************'
);

logFunctionTestingHeader('isInGrid');
test(isInGrid, [exampleGrid, [6, 4]], true);
test(isInGrid, [exampleGrid, [10, 4]], false);
test(isInGrid, [exampleGrid, [6, 10]], false);
test(isInGrid, [exampleGrid, [10, 10]], false);
test(isInGrid, [exampleGrid, [-1, 6]], false);

logFunctionTestingHeader('getNextLocation');
// Test '.'
test(
  getNextLocation,
  [{ grid: exampleGrid, currentLocation: [6, 4], currentDirection: 'up' }],
  {
    coordinates: [5, 4],
    type: '.',
  }
);
// Test '#'
test(
  getNextLocation,
  [{ grid: exampleGrid, currentLocation: [1, 4], currentDirection: 'up' }],
  {
    coordinates: [0, 4],
    type: '#',
  }
);
// Test out of bounds
test(
  getNextLocation,
  [{ grid: exampleGrid, currentLocation: [9, 7], currentDirection: 'down' }],
  {
    coordinates: [10, 7],
    type: '',
  }
);

logFunctionTestingHeader('getAllPositionsBetweenCoordinates');
// Up
test(
  getAllPositionsBetweenCoordinates,
  [
    [7, 4],
    [4, 4],
  ],
  [
    [4, 4],
    [5, 4],
    [6, 4],
    [7, 4],
  ]
);
// Right
test(
  getAllPositionsBetweenCoordinates,
  [
    [0, 4],
    [0, 7],
  ],
  [
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 7],
  ]
);
// down
test(
  getAllPositionsBetweenCoordinates,
  [
    [4, 4],
    [7, 4],
  ],
  [
    [4, 4],
    [5, 4],
    [6, 4],
    [7, 4],
  ]
);
// left
test(
  getAllPositionsBetweenCoordinates,
  [
    [0, 7],
    [0, 4],
  ],
  [
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 7],
  ]
);
