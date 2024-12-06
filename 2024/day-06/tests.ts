import { test } from '../../utils';
import { getGuardLocation, getNextLocation, isInGrid, patrol } from './logic';
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
// test(getPart1Solution, [exampleGrid], 41);

console.log('\n\n🧪 Testing getGuardLocation');
test(getGuardLocation, [exampleGrid], [6, 4]);

console.log('\n\n🧪 Testing isInGrid');
test(isInGrid, [exampleGrid, [6, 4]], true);
test(isInGrid, [exampleGrid, [10, 4]], false);
test(isInGrid, [exampleGrid, [6, 10]], false);
test(isInGrid, [exampleGrid, [10, 10]], false);

console.log('\n\n🧪 Testing patrol');
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

console.log('\n\n🧪 Testing getNextLocation');
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

console.log(
  '\n\n***********************\n**** PART 2 TESTING ***\n***********************'
);
