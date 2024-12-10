import { getTextInputFromFileInLines } from '../../utils';
import { addAllValidEquations, parseInput } from './logic';

const input = getTextInputFromFileInLines('./input.txt');
console.log('ANSWER>>>', getPart1Solution(input));

export function getPart1Solution(input: string[]): number {
  const parsedInput = parseInput(input);
  return addAllValidEquations(parsedInput);
}
