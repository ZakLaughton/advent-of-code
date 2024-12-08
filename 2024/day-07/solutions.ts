import { getTextInputFromFileInLines } from '../../utils';
// import { getTotalOfEquationsThatMatch, parseInput } from './logic';

// const input = getTextInputFromFileInLines('./input.txt');

export function getPart1Solution(input: string[]): number {
  return 0;
}

/**
 * Parses the input lines into structured data.
 */
export function parseInput(
  input: string[]
): { target: number; operands: number[] }[] {
  return input.map((line) => {
    const [target, rest] = line.split(': ');
    return {
      target: Number(target),
      operands: rest.split(' ').map(Number),
    };
  });
}
