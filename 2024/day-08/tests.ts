import {
  getTextInputFromFileInLines,
  logFunctionTestingHeader,
  test,
} from '../../utils';
import { getPart1Solution } from './solutions';

const exampleInput = getTextInputFromFileInLines('./example-input.txt');

logFunctionTestingHeader('getPart1Solution()');
test(getPart1Solution, [exampleInput], 14);
