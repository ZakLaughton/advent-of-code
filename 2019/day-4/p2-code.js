const input = [153517, 630395];
const inputMin = input[0];
const inputMax = input[1];

const containsDoubles = password => {
  const passwordArray = password.toString().split('');
  return passwordArray.some(
    (digit, index, array) =>
      array[index + 1] === digit && array[index + 2] !== digit && array[index - 1] !== digit
  );
};
const areAllNumbersIncreasing = password => {
  const passwordArray = password.toString().split('');
  return passwordArray.every(
    (digit, index, array) => digit <= array[index + 1] || index + 1 === array.length
  );
};

let count = 0;

for (let i = inputMin; i <= inputMax; i++) {
  if (containsDoubles(i) && areAllNumbersIncreasing(i)) {
    count += 1;
  }
}

console.log(count);
