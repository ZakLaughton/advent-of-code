const fs = require('fs');

// @ts-expect-error
fs.readFile('p1-input.txt', (err, data) => {
  if (err) throw err;

  console.log(data.toString());
});

// test(add, [1, 2], 3);
