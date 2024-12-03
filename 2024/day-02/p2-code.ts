import { getTextInputFromFile, test } from '../../utils';

const inputLines = getTextInputFromFile('./p1-input.txt');
console.log('Answer>>>', getNumberOfSafeLines(inputLines));

/* FUNCTIONS */
function getNumberOfSafeLines(input: string): number {
  const lines = input.split('\n');
  let safeLines = 0;
  for (const line of lines) {
    if (isLineSafe(line) || isLineSafeWithDamper(line)) {
      safeLines++;
    }
  }
  return safeLines;
}

function isLineSafe(report: string): boolean {
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
      return false;
    }
  }

  return true;
}

// Tests if the line is safe after any level is removed
function isLineSafeWithDamper(report: string): boolean {
  const levels = report.split(' ');
  for (let i = 0; i < levels.length; i++) {
    const newLevels = levels.slice(0, i).concat(levels.slice(i + 1));
    if (isLineSafe(newLevels.join(' '))) {
      return true;
    }
  }
  return false;
}

/* TESTS */
const exampleInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

test(getNumberOfSafeLines, [exampleInput], 4);
test(isLineSafe, ['7 6 4 2 1'], true);
test(isLineSafe, ['1 2 7 8 9'], false);
test(isLineSafe, ['9 7 6 2 1'], false);
test(isLineSafe, ['1 3 2 4 5'], false);
test(isLineSafe, ['8 6 4 4 1'], false);
test(isLineSafe, ['1 3 2 4 5'], true);
test(isLineSafe, ['8 6 4 4 1'], true);
test(isLineSafe, ['1 3 6 7 9'], true);
test(isLineSafe, ['2 5 6 8 11 13'], true);
