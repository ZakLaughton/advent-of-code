export function test<T>(
  func: (...args: any[]) => T,
  input: any[],
  expected: T
) {
  const result = func(...input); // Spread input in case it's an array of arguments
  if (result instanceof Set && expected instanceof Set) {
    const resultArray = Array.from(result).sort();
    const expectedArray = Array.from(expected).sort();
    if (JSON.stringify(resultArray) === JSON.stringify(expectedArray)) {
      console.log(`✅ Test passed. Input: ${JSON.stringify(input)}`);
    } else {
      console.error(
        `❌ Test failed. Input: ${JSON.stringify(
          input
        )}, Expected: ${JSON.stringify(expectedArray)}, Got: ${JSON.stringify(
          resultArray
        )}`
      );
    }
  } else if (JSON.stringify(result) === JSON.stringify(expected)) {
    console.log(`✅ Test passed. Input: ${JSON.stringify(input)}`);
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

export function getTextInputFromFileInLines(file: string) {
  return splitTextInputIntoLines(getTextInputFromFile(file));
}

export function splitTextInputIntoLines(input: string): string[] {
  return input.split('\n');
}
