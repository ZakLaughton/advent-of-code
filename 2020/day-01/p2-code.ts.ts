import { getInputByLine } from '../../utils';

const INPUT_LINES = getInputByLine(__dirname, 'p1-input.txt');
outerLoop: for (const [indexA, valueA] of INPUT_LINES.entries()) {
  for (const [indexB, valueB] of INPUT_LINES.entries()) {
    if (indexA === indexB || Number(valueA) + Number(valueB) >= 2020) {
      continue;
    }
    for (const [indexC, valueC] of INPUT_LINES.entries()) {
      if (indexC === indexA || indexC === indexB) {
        continue;
      }
      if (Number(valueA) + Number(valueB) + Number(valueC) === 2020) {
        console.log(valueA, valueB, valueC);
        console.log(Number(valueA) * Number(valueB) * Number(valueC));
        break outerLoop;
      }
    }
  }
}
