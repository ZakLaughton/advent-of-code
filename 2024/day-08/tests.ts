import {
  getTextInputFromFileInLines,
  logFunctionTestingHeader,
  test,
} from '../../utils';
import { countAntinodes } from './logic';
import { getPart1Solution } from './solutions';

const exampleInput = getTextInputFromFileInLines('./example-input.txt');

logFunctionTestingHeader('getPart1Solution()');
test(getPart1Solution, [exampleInput], 14);

logFunctionTestingHeader('countAntinodes');
test(countAntinodes, [exampleInput], 14);
