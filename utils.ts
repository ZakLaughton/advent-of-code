export function test<T>(
  func: (...args: any[]) => T,
  input: any[],
  expected: T
) {
  const result = func(...input); // Spread input in case it's an array of arguments
  if (JSON.stringify(result) === JSON.stringify(expected)) {
    console.log(
      `✅ Test passed. Input: ${JSON.stringify(
        input
      )}, Output: ${JSON.stringify(result)}`
    );
  } else {
    console.error(
      `❌ Test failed. Input: ${JSON.stringify(
        input
      )}, Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(result)}`
    );
  }
}
export function getTextInputFromFile(file: string) {
  const fs = require('fs');
  return fs.readFileSync(file).toString();
}

function splitTextInputIntoLines(input: string): string[] {
  return input.split('\n');
}

/**
 * TESTS
 */

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
