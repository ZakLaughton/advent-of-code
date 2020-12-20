import { getInputByLine } from '../../utils';

const INPUT_LINES = getInputByLine(__dirname, 'p1-input.txt');

let validCount = 0;

for (const line of INPUT_LINES) {
  const { min, max, letter, password } = parseRulesAndPasswordsInput(line);
  const numberOfLetterOccurrences = countCharacterOccurrencesInString({
    string: password,
    character: letter,
  });
  if (
    numberOfLetterOccurrences >= Number(min) &&
    numberOfLetterOccurrences <= Number(max)
  ) {
    validCount += 1;
  }
}

console.log(validCount);

function parseRulesAndPasswordsInput(input: string) {
  const [, min, max, letter, password] =
    input.match(/(\d+)-(\d+) (\w): (.*)/) ?? [];
  return { min, max, letter, password };
}

export function countCharacterOccurrencesInString({
  string,
  character,
}: {
  string: string;
  character: string;
}) {
  return string.replace(new RegExp(`[^${character}]`, 'g'), '').length;
}
