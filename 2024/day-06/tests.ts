import { test } from '../../utils';
import { getPart1Solution } from './solutions';

// Copied from https://adventofcode.com/2024/day/6
const exampleInput = [
  `....#.....`,
  `.........#`,
  `..........`,
  `..#.......`,
  `.......#..`,
  `..........`,
  `.#..^.....`,
  `........#.`,
  `#.........`,
  `......#...`,
];

test(getPart1Solution, [exampleInput], 41);
