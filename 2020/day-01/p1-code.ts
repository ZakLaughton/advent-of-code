import { getInputByLine } from '../../utils';

const INPUT_LINES = getInputByLine(__dirname, 'p1-input.txt');
for (const number of INPUT_LINES) {
  const numberToAddFor2020 = (2020 - Number(number)).toString();
  if (INPUT_LINES.some((number) => number === numberToAddFor2020)) {
    console.log(number, numberToAddFor2020);
    console.log(Number(number) * Number(numberToAddFor2020));
    break;
  }
}
