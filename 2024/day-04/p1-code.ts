import { test } from '../../utils';

// Takes an array of lines from word search. Returns the times a
// given word appears horizontal, vertical, and diagonally, both
// forwards and backwards
function countAllWord(input: string[], wordToFind: string) {
  let count = 0;
  for (const [rowIndex, row] of input.entries()) {
    count += countNumberOfOccurrencesInString(row, wordToFind); // Count horizontal matches
    let letterIndex = 0;
    for (const letter of row) {
      if (letter === wordToFind[0]) {
        //              test up-left
        //              test up
        //              test up-right
        //              test down-left
        //              test down
        //              test down-right
      }
      letterIndex++;
    }
  }
  return count;
}

// Finds number of forwards and backwards occurrences in a string
function countNumberOfOccurrencesInString(
  input: string,
  wordToFind: string
): number {
  const reverseWordToFind = wordToFind.split('').reverse().join('');
  //   console.log('words to find:', wordToFind, reverseWordToFind);

  const wordRegex = new RegExp(wordToFind, 'g');
  const revereseWordRegex = new RegExp(reverseWordToFind, 'g');

  //   console.log('number of word match result:', input.match(wordToFind));
  const numberOfWord = input.match(wordRegex)?.length ?? 0;
  const numberOfReverseWord = input.match(revereseWordRegex)?.length ?? 0;

  //   console.log('word, reveresed count:', numberOfWord, numberOfReverseWord);
  return numberOfWord + numberOfReverseWord;
}

function isWordMatched(
  letterMap: string[],
  startingCoordinates: number[],
  word: string,
  direction: 'upLeft' | 'up' | 'upRight' | 'downLeft' | 'down' | 'downRight'
): boolean {
  // Provides the way for each direction to move
  const directionDelta = {
    upLeft: [-1, -1],
    up: [-1, 0],
    upRight: [-1, 1],
    downLeft: [1, -1],
    down: [1, 0],
    downRight: [1, 1],
  };
  let currentCoordinates = startingCoordinates;
  for (const letter of word) {
    const x = currentCoordinates[0];
    const y = currentCoordinates[1];
    const currentLetterOnMap = letterMap[x][y];
    if (currentLetterOnMap === undefined || letter !== currentLetterOnMap) {
      return false;
    }
    currentCoordinates[0] += directionDelta[direction][0];
    currentCoordinates[1] += directionDelta[direction][1];
  }
  return true;
}

/** TESTS */

// This input has 8 XMASes, all stretching out in different
// directions from the center X to represent all possible
// representations of the word.
// There are also other random letters sprinkled in for testing
const testWordMapInput = [
  `S..S..S`,
  `.A.A.AM`,
  `..MMM.X`,
  `SAMXMAS`,
  `..MMM..`,
  `.AXA.A.`,
  `S.SS..S`,
];

// Testing countAllWord()
test(countAllWord, [testWordMapInput, 'XMAS'], 8);

// Testing countNumberOfOccurrencesInString()
test(countNumberOfOccurrencesInString, [`SAMXMAS`, 'XMAS'], 2);
test(countNumberOfOccurrencesInString, [`SAMXMASXMASS`, 'XMAS'], 3);
test(countNumberOfOccurrencesInString, [`ABCDE`, 'XMAS'], 0);
test(countNumberOfOccurrencesInString, [`SAMX`, 'XMAS'], 1);

console.log('🧪 Testing isWordMatched upLeft');
test(isWordMatched, [testWordMapInput, [3, 3], 'XMAS', 'upLeft'], true);
test(isWordMatched, [testWordMapInput, [2, 6], 'XMAS', 'upLeft'], false);

console.log('🧪 Testing isWordMatched up');
test(isWordMatched, [testWordMapInput, [3, 3], 'XMAS', 'up'], true);
test(isWordMatched, [testWordMapInput, [2, 6], 'XMAS', 'up'], false);

console.log('🧪 Testing isWordMatched upRight');
test(isWordMatched, [testWordMapInput, [3, 3], 'XMAS', 'upRight'], true);
test(isWordMatched, [testWordMapInput, [2, 6], 'XMAS', 'upRight'], false);

console.log('🧪 Testing isWordMatched downLeft');
test(isWordMatched, [testWordMapInput, [3, 3], 'XMAS', 'downLeft'], true);
test(isWordMatched, [testWordMapInput, [2, 6], 'XMAS', 'downLeft'], false);

console.log('🧪 Testing isWordMatched down');
test(isWordMatched, [testWordMapInput, [3, 3], 'XMAS', 'down'], true);
test(isWordMatched, [testWordMapInput, [2, 6], 'XMAS', 'down'], false);

console.log('🧪 Testing isWordMatched downRight');
test(isWordMatched, [testWordMapInput, [3, 3], 'XMAS', 'downRight'], true);
test(isWordMatched, [testWordMapInput, [2, 6], 'XMAS', 'downRight'], false);
