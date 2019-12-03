const fs = require('fs');

const inputPath = `${__dirname}/p1-input.txt`;
const inputData = fs.readFileSync(inputPath, 'utf8').split(',');
const inputDataNumbers = inputData.map(item => Number(item));

let currentPosition = 0;

while (inputDataNumbers[currentPosition] !== 99) {
  const instruction = inputDataNumbers[currentPosition];
  const input1Index = inputDataNumbers[currentPosition + 1];
  const input2Index = inputDataNumbers[currentPosition + 2];
  const input1 = inputDataNumbers[input1Index];
  const input2 = inputDataNumbers[input2Index];

  const result = instruction === 1 ? input1 + input2 : input1 * input2;
  const resultIndex = inputDataNumbers[currentPosition + 3];
  inputDataNumbers[resultIndex] = result;
  currentPosition += 4;
}

console.log(inputDataNumbers[0]);
