import { getTextInputFromFile } from '../../utils';
import { getMiddlePageTotal, parseRulesAndUpdatesFromInput } from './logic';

const input = getTextInputFromFile('./input.txt');

console.log('Part 1 Solution>>>', getPart1Solution(input));

export function getPart1Solution(input: string): number {
  const parsedInput = parseRulesAndUpdatesFromInput(input);
  const middlePageTotal = getMiddlePageTotal(parsedInput);
  return middlePageTotal;
}
