// @ts-nocheck
/** THIS ONE IS A SPAGHETTI MESS.
 * Worked on it longer than I should.
 * Made spaghetti mess instead of taking a break.
 * Learning experience.  */

import { getTextInputFromFileInLines, test } from '../../utils';

type Operation = 'ASSIGN' | 'AND' | 'OR' | 'NOT' | 'LSHIFT' | 'RSHIFT';
type ParsedInstruction = {
  operationName: Operation;
  input: (string | number)[];
  assignee: string;
};
type ParsedOperation = {
  operationName: Operation;
  input: (string | number)[];
};

const input = getTextInputFromFileInLines('./input.txt');
console.log('ANSWER>>>', getSignalFromWireA(input));

/** FUNCTIONS */
// Gets the signal on wire 'a' after running the instructions
function getSignalFromWireA(input: string[]): number {
  const instructions = input;
  const wireSignals = runInstructions(instructions);
  return wireSignals.a;
}

// Runs a set of parsed instructions and returns a map of the signals on each wire
function runInstructions(
  instructions: ParsedInstruction[]
): Map<string, number> {
  const parsedInstructions = instructions.map(parseInstruction);
  const wireSignals = {};

  let completedInstructionIndices = [];
  while (completedInstructionIndices.length < parsedInstructions.length) {
    console.log(
      'Starting while loop with',
      parsedInstructions.length,
      'instructions left'
    );
    console.log('Completed instructions:', completedInstructionIndices);
    // console.log('Instructions:', parsedInstructions);
    console.log('Wire signals:', wireSignals);
    let originalInstructions = [...parsedInstructions];
    console.log('Original instructions:', originalInstructions);
    for (let index = 0; index < parsedInstructions.length; index++) {
      const { operationName, input, assignee } = originalInstructions[index];
      // Skip if the instruction has already been completed
      if (completedInstructionIndices.includes(index)) {
        continue;
      }
      // Skip if the value for any input is not yet available
      if (
        input.some(
          (value) => !/\d/g.test(value) && wireSignals[value] === undefined
        )
      ) {
        console.log('Skipping instruction:', originalInstructions[index]);
        continue;
      }
      // If either of the inputs are wires, get their values
      const values = input.map((value) =>
        isNumber(value) ? value : wireSignals[value]
      );
      const result = evaluateOperation(operationName, values);
      wireSignals[assignee] = result;
      completedInstructionIndices.push(index);
    }
  }

  return wireSignals;
}

function parseInstruction(instruction: string): ParsedInstruction {
  //   console.log('Parsing instruction:', instruction);
  const regex = /^(.*?) -> (\w+)/;
  const match = instruction.match(regex);

  //   console.log('Instruction match:', match);

  const [, operation, assignee] = match;
  const { operationName, input } = parseOperation(operation);

  return { operationName, input, assignee };
}

// parses the operation part of an instruction
function parseOperation(operationString: string): ParsedOperation {
  //   console.log('Parsing operation:', operationString);
  let operationName = '';
  let input = [];
  if (operationString.substring(0, 3) === 'NOT') {
    // test for NOT
    operationName = 'NOT';
    const regex = /NOT (\w+)$/;
    const match = operationString.match(regex);
    input.push(match[1]);

    return { operationName, input };
  } else if (operationString.includes('OR')) {
    // test for OR
    operationName = 'OR';
    const regex = /(\w+) OR (\w+)$/;
    const match = operationString.match(regex);
    input.push(match[1], match[2]);

    return { operationName, input };
  } else if (operationString.includes('AND')) {
    // test for AND
    operationName = 'AND';
    const regex = /(\w+) AND (\w+)$/;
    const match = operationString.match(regex);
    input.push(match[1], match[2]);

    return { operationName, input };
  } else if (operationString.includes('RSHIFT')) {
    // test for RSHIFT
    operationName = 'RSHIFT';
    const regex = /(\w+) RSHIFT (\d+)$/;
    const match = operationString.match(regex);
    input.push(match[1], Number(match[2]));

    return { operationName, input };
  } else if (operationString.includes('LSHIFT')) {
    // test for LSHIFT
    operationName = 'LSHIFT';
    const regex = /(\w+) LSHIFT (\d+)$/;
    const match = operationString.match(regex);
    input.push(match[1], Number(match[2]));

    return { operationName, input };
  } else {
    // test for assignment
    operationName = 'ASSIGN';
    if (isNumber(operationString)) input.push(Number(operationString));
    else input.push(operationString);

    return { operationName, input };
  }
}

function evaluateOperation(operationName: Operation, input: number[]) {
  console.log('Evaluating operation:', operationName, 'with input:', input);
  switch (operationName) {
    case 'ASSIGN':
      return input[0];
    case 'NOT':
      return ~input[0] & 0xffff;
    case 'AND':
      return input[0] & input[1] & 0xffff;
    case 'OR':
      return input[0] | (input[1] & 0xffff);
    case 'RSHIFT':
      return (input[0] >> input[1]) & 0xffff;
    case 'LSHIFT':
      return (input[0] << input[1]) & 0xffff;
  }
}

function isNumber(character: string): boolean {
  return !isNaN(Number(character));
}

/** TESTS */
console.log('\n\n🧪 Testing runInstructions');
const testInput = [
  '123 -> x',
  '456 -> y',
  'x AND y -> d',
  'x OR y -> e',
  'x LSHIFT 2 -> f',
  'y RSHIFT 2 -> a',
  'NOT x -> h',
  'NOT y -> i',
];
test(runInstructions, [testInput], {
  d: 72,
  e: 507,
  f: 492,
  a: 114,
  h: 65412,
  i: 65079,
  x: 123,
  y: 456,
});

console.log('\n\n🧪 Testing parseInstruction');
test(parseInstruction, ['NOT dq -> dr'], {
  operationName: 'NOT',
  input: ['dq'],
  assignee: 'dr',
});
test(parseInstruction, ['kg OR kf -> kh'], {
  operationName: 'OR',
  input: ['kg', 'kf'],
  assignee: 'kh',
});
test(parseInstruction, ['44430 -> b'], {
  operationName: 'ASSIGN',
  input: [44430],
  assignee: 'b',
});
test(parseInstruction, ['y AND ae -> ag'], {
  operationName: 'AND',
  input: ['y', 'ae'],
  assignee: 'ag',
});
test(parseInstruction, ['kk RSHIFT 3 -> km'], {
  operationName: 'RSHIFT',
  input: ['kk', 3],
  assignee: 'km',
});
test(parseInstruction, ['bk LSHIFT 1 -> ce'], {
  operationName: 'LSHIFT',
  input: ['bk', 1],
  assignee: 'ce',
});

console.log('\n\n🧪 Testing parseOperation');
test(parseOperation, ['NOT dq'], {
  operationName: 'NOT',
  input: ['dq'],
});
test(parseOperation, ['kg OR kf'], {
  operationName: 'OR',
  input: ['kg', 'kf'],
});
test(parseOperation, ['44430'], {
  operationName: 'ASSIGN',
  input: [44430],
});
test(parseOperation, ['y AND ae'], {
  operationName: 'AND',
  input: ['y', 'ae'],
});
test(parseOperation, ['kk RSHIFT 3'], {
  operationName: 'RSHIFT',
  input: ['kk', 3],
});
test(parseOperation, ['bk LSHIFT 1'], {
  operationName: 'LSHIFT',
  input: ['bk', 1],
});

console.log('\n\n🧪 Testing isNumber');
test(isNumber, ['1'], true);
test(isNumber, ['a'], false);

console.log('\n\n🧪 Testing evaluateOperation');
test(evaluateOperation, ['ASSIGN', [1]], 1);
test(evaluateOperation, ['NOT', [123]], 65412);
test(evaluateOperation, ['AND', [30, 20]], 20);
test(evaluateOperation, ['OR', [31, 22]], 31);
test(evaluateOperation, ['RSHIFT', [8, 2]], 2);
test(evaluateOperation, ['LSHIFT', [8, 2]], 32);
