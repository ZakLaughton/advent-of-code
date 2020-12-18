const { getInputByLine } = require("../../utils");

const inputLines = getInputByLine(__dirname, "p1-input.txt");

// split rules into fields, my ticket, and other tickets
const { fields, myTicket, nearbyTickets } = separateInput(inputLines);
const validNumbers = getAllValidNumbersFromFields(fields);
const totalErrorRate = nearbyTickets.reduce((accumulator, currentTicket) => {
  const ticketErrorRate = currentTicket
    .split(",")
    .reduce((accumulator, currentValue) => {
      if (!validNumbers.some((number) => number === Number(currentValue))) {
        return accumulator + Number(currentValue);
      }
      return accumulator;
    }, 0);
  return ticketErrorRate + accumulator;
}, 0);
console.log(totalErrorRate);

function separateInput(input) {
  const yourTicketTitleIndex = input.findIndex(
    (lineItem) => lineItem === "your ticket:"
  );
  return {
    fields: input.slice(0, yourTicketTitleIndex - 1),
    myTicket: input[yourTicketTitleIndex + 1],
    nearbyTickets: input.slice(yourTicketTitleIndex + 4),
  };
}

function getAllValidNumbersFromFields(fields) {
  const numberRangeRegex = /(\d+)-(\d+)/g;
  const allTextRanges = fields.reduce((accumulator, currentValue) => {
    return [...accumulator, ...currentValue.matchAll(numberRangeRegex)];
  }, []);
  const validNumbers = getAllValidNumbersFromTextRanges(allTextRanges);
  return validNumbers;
}

function getAllValidNumbersFromTextRanges(textRanges) {
  return textRanges.reduce((accumulator, currentValue) => {
    return [...accumulator, ...range(currentValue[1], currentValue[2])];
  }, []);
}

function range(start, end) {
  const size = end - start + 1;
  const allMatches = [...Array(size).keys()].map((i) => i + Number(start));
  const allMatchesWithoutDupes = [...new Set(allMatches)];
  return allMatchesWithoutDupes;
}
