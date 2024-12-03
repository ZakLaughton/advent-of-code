import { getTextInputFromFile, test } from '../../utils';

const inputLines = getTextInputFromFile('./p1-input.txt');
console.log('Answer>>>', getNumberOfSafeLines(inputLines));

/* FUNCTIONS */
function getNumberOfSafeLines(input: string): number {
  const lines = input.split('\n');
  let safeLines = 0;
  for (const line of lines) {
    if (testLineSafety(line)) {
      safeLines++;
    }
  }
  return safeLines;
}

function testLineSafety(report: string): boolean {
  const levels = report.split(' ');
  const ascending = Number(levels[1]) < Number(levels[2]);

  for (let i = 1; i < levels.length; i++) {
    const prev = Number(levels[i - 1]);
    const curr = Number(levels[i]);

    if (
      (ascending && prev > curr) ||
      (!ascending && prev < curr) ||
      prev === curr ||
      Math.abs(prev - curr) > 3
    ) {
      //   console.log(
      //     'line is not safe>>>',
      //     report,
      //     'prev:',
      //     prev,
      //     'curr:',
      //     curr,
      //     'ascending:',
      //     ascending
      //   );
      //   console.log('1', ascending && prev > curr);
      //   console.log('2', !ascending && prev < curr);
      //   console.log('3', prev === curr);
      //   console.log('4', Math.abs(prev - curr) > 3);
      return false;
    }
  }

  return true;
}

/* TESTS */
const exampleInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

test(getNumberOfSafeLines, [exampleInput], 2);
test(testLineSafety, ['7 6 4 2 1'], true);
test(testLineSafety, ['1 2 7 8 9'], false);
test(testLineSafety, ['9 7 6 2 1'], false);
test(testLineSafety, ['1 3 2 4 5'], false);
test(testLineSafety, ['8 6 4 4 1'], false);
test(testLineSafety, ['1 3 6 7 9'], true);
test(testLineSafety, ['2 5 6 8 11 13'], true);
