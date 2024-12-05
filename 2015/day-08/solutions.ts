console.log('Part 1 Solution>>>', getPart1Solution(input));
// console.log('Part 2 Solution>>>', getPart2Solution(input));

export function getPart1Solution(input: string[]): number {
  let charCountStringLiterals = 0;
  let charCountInMemory = 0;
  for (const line of input) {
    charCountStringLiterals += countStringLiteralChars(line);
    // charCountInMemory += countInMemoryChars(line);
  }

  return charCountStringLiterals - charCountInMemory;
}

// export function getPart2Solution() {}
