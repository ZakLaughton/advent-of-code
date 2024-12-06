import { logFunctionTestingHeader, test } from '../../utils';
import { getNextLocation, isInGrid } from './grid';

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

logFunctionTestingHeader('getNextLocation');
// Test '.'
test(
  getNextLocation,
  [{ grid: exampleGrid, currentLocation: [6, 4], currentDirection: 'up' }],
  {
    coordinates: [5, 4],
    locationType: '.',
  }
);
// Test '#'
test(
  getNextLocation,
  [{ grid: exampleGrid, currentLocation: [1, 4], currentDirection: 'up' }],
  {
    coordinates: [0, 4],
    locationType: '#',
  }
);
// Test out of bounds
test(
  getNextLocation,
  [{ grid: exampleGrid, currentLocation: [9, 7], currentDirection: 'down' }],
  {
    coordinates: [10, 7],
    locationType: '',
  }
);
