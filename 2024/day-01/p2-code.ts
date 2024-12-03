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

const leftNumberOccurrencesInRight = getNumberOccurrencesInList1InList2(
  leftNumbers,
  rightNumbers
);
let similarityScore = 0;
for (const number of leftNumbers) {
  similarityScore += number * leftNumberOccurrencesInRight[number];
}

console.log('Answer>>>', similarityScore);

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

function countNumberOccurrencesInList(number: number, list: number[]): number {
  let count = 0;
  for (const item of list) {
    if (item === number) {
      count++;
    }
  }
  return count;
}

// Gets the total number of times a number in list 1 appears in list 2, returns a dictionary with that number as the key and the count as the value
function getNumberOccurrencesInList1InList2(
  list1: number[],
  list2: number[]
): { [key: number]: number } {
  const occurrences: { [key: number]: number } = {};
  for (const number of list1) {
    if (occurrences[number] === undefined) {
      occurrences[number] = countNumberOccurrencesInList(number, list2);
    }
  }
  return occurrences;
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

test(countNumberOccurrencesInList, [3, [1, 2, 3, 3, 3, 4]], 3);
test(
  getNumberOccurrencesInList1InList2,
  [
    [1, 2, 3, 3, 3, 4],
    [3, 3, 3, 4, 5, 9],
  ],
  { 1: 0, 2: 0, 3: 3, 4: 1 }
);
