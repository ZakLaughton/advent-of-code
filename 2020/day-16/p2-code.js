const { getInputByLine } = require("../../utils");

const inputLines = getInputByLine(__dirname, "p1-input.txt");

const { fields, myTicket, nearbyTickets } = separateInput(inputLines);
const possibleValuesForEachField = {};
for (let field of fields) {
  const fieldName = field.match(/^[\w ]+(?=:)/);
  const numberRangeRegex = /(\d+)-(\d+)/g;
  const fieldRanges = [...field.matchAll(numberRangeRegex)];
  possibleValuesForEachField[fieldName] = getAllValidNumbersFromTextRanges(
    fieldRanges
  );
}
const allValidNumbers = getAllValidNumbersFromFields(fields);
let validTickets = nearbyTickets.filter((ticket) =>
  ticket
    .split(",")
    .every((value) =>
      allValidNumbers.some(
        (validNumber) => Number(validNumber) === Number(value)
      )
    )
);

validTickets.push(myTicket);
let possibleFieldsForEachValue = Array.from(
  { length: myTicket.split(",").length },
  () => Object.keys(possibleValuesForEachField)
);

for (let ticket of validTickets) {
  for (const [index, ticketValue] of ticket.split(",").entries()) {
    for (let possibleField of possibleFieldsForEachValue[index]) {
      if (
        !possibleValuesForEachField[possibleField].some(
          (value) => Number(value) === Number(ticketValue)
        )
      ) {
        possibleFieldsForEachValue[index].splice(
          possibleFieldsForEachValue.indexOf(possibleField),
          1
        );
      }
    }
  }
}

console.log(possibleFieldsForEachValue);

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

// TODO: allValidNumbersByField()

function getAllValidNumbersForAField(fieldText) {
  const numberRangeRegex = /(\d+)-(\d+)/g;
  const allTextRanges = fields.reduce((accumulator, currentValue) => {
    return [...accumulator, ...currentValue.matchAll(numberRangeRegex)];
  }, []);
  const validNumbers = getAllValidNumbersFromTextRanges(allTextRanges);
  return validNumbers;
}

function getAllValidNumbersFromTextRanges(textRanges) {
  const allValidNumbers = textRanges.reduce((accumulator, currentValue) => {
    return [...accumulator, ...range(currentValue[1], currentValue[2])];
  }, []);
  const allValidNumbersNoDupes = [...new Set(allValidNumbers)];
  return allValidNumbersNoDupes;
}

function range(start, end) {
  const size = end - start + 1;
  const allMatches = [...Array(size).keys()].map((i) => i + Number(start));
  const allMatchesWithoutDupes = [...new Set(allMatches)];
  return allMatchesWithoutDupes;
}
