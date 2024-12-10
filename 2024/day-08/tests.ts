import {
  getTextInputFromFileInLines,
  logFunctionTestingHeader,
  test,
} from '../../utils';
import {
  countAntinodes,
  getAntennaLocations,
  getAntinodeLocations,
  getAntinodeLocationsForGivenLocations,
  getAntinodeLocationsForTwoAntennas,
} from './logic';
import { getPart1Solution } from './solutions';

const exampleInput = getTextInputFromFileInLines('./example-input.txt');

logFunctionTestingHeader('getPart1Solution()');
test(getPart1Solution, [exampleInput], 14);

logFunctionTestingHeader('countAntinodes()');
test(countAntinodes, [exampleInput], 14);

logFunctionTestingHeader('getAntennaLocations()');
test(getAntennaLocations, [exampleInput], {
  '0': [
    [1, 8],
    [2, 5],
    [3, 7],
    [4, 4],
  ],
  A: [
    [5, 6],
    [8, 8],
    [9, 9],
  ],
});

logFunctionTestingHeader('getAntinodeLocations()');
test(
  getAntinodeLocations,
  [
    {
      '0': [
        [1, 8],
        [2, 5],
        [3, 7],
        [4, 4],
      ],
      A: [
        [5, 6],
        [8, 8],
        [9, 9],
      ],
    },
  ],
  [
    [0, 6],
    [0, 11],
    [1, 3],
    [2, 4],
    [2, 10],
    [3, 2],
    [4, 9],
    [5, 1],
    [5, 6],
    [6, 3],
    [7, 0],
    [7, 7],
    [10, 10],
    [11, 10],
  ]
);

/**
 * Sample grid to test:
 *
 * ..A..
 * .A.A.
 * .....
 */
logFunctionTestingHeader('getAntinodeLocationsForGivenLocations()');
test(
  getAntinodeLocationsForGivenLocations,
  [
    [
      [0, 2],
      [1, 1],
      [1, 3],
    ],
  ],
  [
    [-1, 1],
    [-1, 3],
    [1, -1],
    [1, 5],
    [2, 0],
    [2, 4],
  ]
);

logFunctionTestingHeader('getAntinodeLocationsForTwoAntennas()');
test(
  getAntinodeLocationsForTwoAntennas,
  [
    [0, 2],
    [1, 1],
  ],
  [
    [-1, 3],
    [2, 0],
  ]
);
