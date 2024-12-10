import { log } from 'console';
import {
  getTextInputFromFileInLines,
  logFunctionTestingHeader,
  test,
} from '../../utils';
import { addAllValidEquations, isValidEquation, parseInput } from './logic';
import { getPart1Solution } from './solutions';

const exampleInput = getTextInputFromFileInLines('./example-input.txt');

logFunctionTestingHeader('getPart1Solution()');
test(getPart1Solution, [exampleInput], 3749);

logFunctionTestingHeader('parseInput()');
test(
  parseInput,
  [exampleInput],
  [
    { result: 190, operands: [10, 19] },
    { result: 3267, operands: [81, 40, 27] },
    { result: 83, operands: [17, 5] },
    { result: 156, operands: [15, 6] },
    { result: 7290, operands: [6, 8, 6, 15] },
    { result: 161011, operands: [16, 10, 13] },
    { result: 192, operands: [17, 8, 14] },
    { result: 21037, operands: [9, 7, 18, 13] },
    { result: 292, operands: [11, 6, 16, 20] },
  ]
);

logFunctionTestingHeader('addAllValidEquations()');
test(
  addAllValidEquations,
  [
    [
      { result: 190, operands: [10, 19] },
      { result: 3267, operands: [81, 40, 27] },
      { result: 83, operands: [17, 5] },
      { result: 156, operands: [15, 6] },
      { result: 7290, operands: [6, 8, 6, 15] },
      { result: 161011, operands: [16, 10, 13] },
      { result: 192, operands: [17, 8, 14] },
      { result: 21037, operands: [9, 7, 18, 13] },
      { result: 292, operands: [11, 6, 16, 20] },
    ],
  ],
  3749
);

logFunctionTestingHeader('isValidEquation()');
test(isValidEquation, [{ result: 190, operands: [10, 19] }], true);
test(isValidEquation, [{ result: 3267, operands: [81, 40, 27] }], true);
test(isValidEquation, [{ result: 83, operands: [17, 5] }], false);
test(isValidEquation, [{ result: 7290, operands: [6, 8, 6, 15] }], false);
test(isValidEquation, [{ result: 292, operands: [11, 6, 16, 20] }], true);
