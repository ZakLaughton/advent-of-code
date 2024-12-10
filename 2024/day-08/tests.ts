import {
  getTextInputFromFileInLines,
  logFunctionTestingHeader,
  test,
} from '../../utils';
import {
  countAntinodes,
  countAntinodesWithHarmonics,
  getAntennaLocations,
  getAntinodeLocations,
  getAntinodeLocationsForGivenLocations,
  getAntinodeLocationsForGivenLocationsWithHarmonics,
  getAntinodeLocationsForTwoAntennas,
  getAntinodeLocationsForTwoAntennasWithHarmonics,
  removeDuplicatesFromLocationArray,
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

/**
 * Sample grid to test:
 *
 * ..A..
 * .A.A.
 * .BB..
 */
logFunctionTestingHeader('getAntinodeLocations()');
test(
  getAntinodeLocations,
  [
    {
      A: [
        [0, 2],
        [1, 1],
        [1, 3],
      ],
      B: [
        [2, 1],
        [2, 2],
      ],
    },
  ],
  [
    [-1, 1],
    [-1, 3],
    [1, -1],
    [1, 5],
    [2, 0],
    [2, 3],
    [2, 4],
  ]
);

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
test(
  getAntinodeLocationsForTwoAntennas,
  [
    [1, 1],
    [1, 3],
  ],
  [
    [1, -1],
    [1, 5],
  ]
);

logFunctionTestingHeader('removeDuplicatesFromLocationArray()');
test(
  removeDuplicatesFromLocationArray,
  [
    [
      [1, 2],
      [55, 67],
      [3, 2],
      [55, 67],
      [1, 2],
    ],
  ],
  [
    [1, 2],
    [55, 67],
    [3, 2],
  ]
);

logFunctionTestingHeader('countAntinodesWithHarmonics()');
test(countAntinodesWithHarmonics, [exampleInput], 34);

/**
 * Sample grid to test:
 *
 * ..A...
 * .A.A..
 * ......
 */
logFunctionTestingHeader(
  'getAntinodeLocationsForGivenLocationsWithHarmonics()'
);
test(
  getAntinodeLocationsForGivenLocationsWithHarmonics,
  [
    [
      [0, 2],
      [1, 1],
      [1, 3],
    ],
    2,
    5,
  ],
  [
    [0, 2],
    [1, 1],
    [1, 3],
    [1, 5],
    [2, 0],
    [2, 4],
  ]
);

/**
 * Sample grid to test:
 *
 * ..A..
 * ...A.
 * .....
 */

logFunctionTestingHeader('getAntinodeLocationsForTwoAntennasWithHarmonics()');
test(
  getAntinodeLocationsForTwoAntennasWithHarmonics,
  [[0, 2], [1, 3], 2, 4],
  [
    [0, 2],
    [1, 3],
    [2, 4],
  ]
);
