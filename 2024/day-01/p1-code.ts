import { getTextInputFromFile, test } from '../../utils';

const leftNumbers = [];
const rightNumbers = [];

const input = getTextInputFromFile('p1-input.txt');
const lines = splitTextInputIntoLines(input);
for (const line of lines) {
  const [left, right] = splitIntoLeftAndRightNumber(line);
  leftNumbers.push(left);
  rightNumbers.push(right);
}
leftNumbers.sort((a, b) => a - b);
rightNumbers.sort((a, b) => a - b);
console.log(
  'Answer>>>',
  getTotalDistanceBetweenLists(leftNumbers, rightNumbers)
);

/******
 * Functions
 */

function splitIntoLeftAndRightNumber(lineText: string): [number, number] {
  const [left, right] = lineText.split(' ').filter((x) => x !== '');
  return [Number(left), Number(right)];
}

function splitTextInputIntoLines(input: string): string[] {
  return input.split('\n');
}

function getTotalDistanceBetweenLists(left: number[], right: number[]): number {
  let totalDistance = 0;
  for (let i = 0; i < left.length; i++) {
    totalDistance += Math.abs(left[i] - right[i]);
  }
  return totalDistance;
}

/*********
 * TESTS *
 *********/

test(splitIntoLeftAndRightNumber, ['25095   46875'], [25095, 46875]);

const splitTextInputIntoLinesInput = `69214   60950
83241   49638
37930   31308
50722   94914
93164   82798
80918   72850
17490   79421`;

test(
  splitTextInputIntoLines,
  [splitTextInputIntoLinesInput],
  [
    '69214   60950',
    '83241   49638',
    '37930   31308',
    '50722   94914',
    '93164   82798',
    '80918   72850',
    '17490   79421',
  ]
);
test(
  getTotalDistanceBetweenLists,
  [
    [1, 2, 3, 3, 3, 4],
    [3, 3, 3, 4, 5, 9],
  ],
  11
);
