const fs = require('fs');

const inputPath = `${__dirname}/p1-input.txt`;
const inputData = fs.readFileSync(inputPath, 'utf8').split(',');
const inputDataNumbers = inputData.map(item => Number(item));

const getOutput = data => {
  let currentPosition = 0;
  let workingData = data;

  while (workingData[currentPosition] !== 99) {
    const instruction = workingData[currentPosition];
    const input1Index = workingData[currentPosition + 1];
    const input2Index = workingData[currentPosition + 2];
    const input1 = workingData[input1Index];
    const input2 = workingData[input2Index];

    const result = instruction === 1 ? input1 + input2 : input1 * input2;
    const resultIndex = workingData[currentPosition + 3];
    workingData[resultIndex] = result;
    currentPosition += 4;
  }

  return workingData[0];
};

let noun, verb;
let workingData;

for (let i = 0; i <= 99; i++) {
  let result;
  for (let j = 0; j <= 99; j++) {
    workingData = [...inputDataNumbers];
    workingData[1] = i;
    workingData[2] = j;
    result = getOutput(workingData);
    if (result === 19690720) {
      noun = i;
      verb = j;
      break;
    }
  }
  if (noun && verb) {
    break;
  }
}

console.log(100 * noun + verb);
