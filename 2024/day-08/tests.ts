import {
  getTextInputFromFileInLines,
  logFunctionTestingHeader,
  test,
} from '../../utils';
import { countAntinodes, getAntennaLocations } from './logic';
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
