const fs = require('fs');

const calculateFuelNeeded = (total, mass) => {
  return total + (Math.floor(Number(mass) / 3) - 2);
};

const inputPath = `${__dirname}/p1-input.txt`;
const inputData = fs.readFileSync(inputPath, 'utf8').split('\n');
const totalFuelNeeded = inputData.reduce(calculateFuelNeeded, 0);
console.log(totalFuelNeeded);
