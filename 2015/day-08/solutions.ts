import { input } from './input';
import { countStringLiteralChars } from './logic';

console.log('Part 1 Partial>>>', getPart1Solution(input));
// console.log('Part 2 Solution>>>', getPart2Solution(input));

export function getPart1Solution(input: string[]): number {
  let charCountStringLiterals = 0;
  // let charCountInMemory = 0;
  for (const line of input) {
    charCountStringLiterals += countStringLiteralChars(line);
  }

  /**
   * Ignore everything below the line of stars. My brilliant solution
   * didn't work. I've tried manually counting based on occurrence 
   * count, I tried a bunch of different variations of that. I even
   * tried manually decoding the escape characters using regex in VS
   * code.
   * 
   * I've submitted about a dozen answers now and they're all wrong.
   * 
   * If you're trying to solve this again, maybe my code isn't a great place to start.
   * 
   * Good luck
   * 
   * ***********************************************************
   * 
   * Alright, so Javascript doesn't seem to have a great capacity for
   * dealing with this kind of string literal business, and I'm tired
   * of trying to figure it out, so we're going to do something
   * unique here.
   *
   * I know the string literal count above is correct based on my
   * tests that give the correct output based on the examples
   * given with the challenge.
   *
   * To ger the charCountInMemory, however, I'm going to manually
   * calculate by subtracting an amount for the following:
   *
   * - quotes [""] | minus 2 for each line
   * - escaped backslash [\\] | minus 1 for each occurrence
   * - escaped quote [\"] | minus 1 for each occurrence
   * - escaped hexadecimal (2-char) [\x11] (where 1 is any hexadecimal character) | minus 3 for each occurrence
   * - escaped hexadecimal (1-char) [\x1] (where 1 is any hexadecimal character) | minus 2 for each occurrence
   * - escaped hexadecimal (2-char) [\x] | minus 1 for each occurrence
  
   * Alright, here are the counts from the input and total to subtract
   * - [""]: 300 lines | minus 600
   * - [\\]: 111x | minus 111
   * - [\"]: 275x | minus 275
   * - [\x11]: 123x | minus 369
   *    - Sidenote: the input included instances of \x NOT followed
   *      by hexadecimal characters. How cruel. I caught them before
   *      running my calculations with this regex:
   *      \\x[0123456789abcdef]{2}
   *
   */
  return charCountStringLiterals;
}

// export function getPart2Solution() {}
