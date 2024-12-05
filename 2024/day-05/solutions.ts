import { getTextInputFromFile } from '../../utils';
import {
  getValidMiddlePageTotal,
  parseRulesAndUpdatesFromInput,
} from './logic';

const input = getTextInputFromFile('./input.txt');

console.log('Part 1 Solution>>>', getPart1Solution(input));
// console.log('Part 2 Solution>>>', getPart2Solution(input));

export function getPart1Solution(input: string): number {
  const parsedInput = parseRulesAndUpdatesFromInput(input);
  const middlePageTotal = getValidMiddlePageTotal(parsedInput);
  return middlePageTotal;
}

export function getPart2Solution(input: string): number {
  const parsedInput = parseRulesAndUpdatesFromInput(input);
  const fixedMiddlePageTotal = getFixedMiddlePageTotal(parsedInput);
  //   return fixedMiddlePageTotal;
}
