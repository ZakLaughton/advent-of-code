import {
  getTextInputFromFile,
  logFunctionTestingHeader,
  test,
} from '../../utils';
import { getAllFileBlocks } from './logic';

const exampleInput = getTextInputFromFile('./example-input.txt');

logFunctionTestingHeader('getAllFileBlocksWithoutGaps()');
test(
  getAllFileBlocks,
  [exampleInput],
  [
    0,
    0,
    1,
    1,
    1,
    2,
    3,
    3,
    3,
    4,
    4,
    5,
    5,
    5,
    5,
    6,
    6,
    6,
    6,
    7,
    7,
    7,
    8,
    8,
    8,
    8,
    9,
    9,
  ]
);
