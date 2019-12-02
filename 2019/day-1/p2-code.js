const fs = require('fs');

const calculateFuelNeededForFuel = fuelMass => {
  let response = Math.floor(Number(fuelMass) / 3) - 2;
  if (response > 0) {
    console.log(`Adding to ${response}`);
    response += calculateFuelNeededForFuel(response);
    console.log(`new total:`, response);
  }

  if (response < 0) {
    return 0;
  }

  return response;
};

const calculateFuelNeeded = (total, mass) => {
  const fuelNeededForModule = Math.floor(Number(mass) / 3) - 2;
  const fuelNeededForFuel = calculateFuelNeededForFuel(fuelNeededForModule);
  return total + fuelNeededForModule + fuelNeededForFuel;
};

const inputPath = `${__dirname}/p1-input.txt`;
const inputData = fs.readFileSync(inputPath, 'utf8').split('\n');
const totalFuelNeeded = inputData.reduce(calculateFuelNeeded, 0);
console.log(totalFuelNeeded);
