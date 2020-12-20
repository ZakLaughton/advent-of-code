import { getInputByLine } from '../../utils';

const INPUT_LINES = getInputByLine(__dirname, 'p1-input.txt');

let validCount = 0;

for (const line of INPUT_LINES) {
  const { index1, index2, letter, password } = parseRulesAndPasswordsInput(
    line
  );
  const letterA = password[Number(index1) - 1];
  const letterB = password[Number(index2) - 1];
  if (letterA !== letterB && (letterA === letter || letterB === letter)) {
    validCount += 1;
  }
}

console.log(validCount);

function parseRulesAndPasswordsInput(input: string) {
  const [, index1, index2, letter, password] =
    input.match(/(\d+)-(\d+) (\w): (.*)/) ?? [];
  return { index1, index2, letter, password };
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
