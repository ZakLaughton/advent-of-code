import { getTextInputFromFile } from '../../utils';
import { fragmentDisk, getAllFileBlocks, getChecksum } from './logic';

const input = getTextInputFromFile('./input.txt');
console.log('PART 1 ANSWER>>>', getPart1Solution(input));
// console.log('PART 2 ANSWER>>>', getPart2Solution(input));

export function getPart1Solution(input: string): number {
  const fileBlocks = getAllFileBlocks(input);
  const fragmentedDiskMap = fragmentDisk(input, fileBlocks);
  const checkSum = getChecksum(fragmentedDiskMap);
  return checkSum;
}

// export function getPart2Solution(input: string[]): number {
//   return countAntinodesWithHarmonics(input);
// }
