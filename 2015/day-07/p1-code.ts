// @ts-nocheck
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
// console.log('ANSWER>>>', getSignalFromWireA(input));

/** FUNCTIONS */

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

function isNumber(character: string): boolean {
  return character >= '0' && character <= '9';
}

/** TESTS */
console.log('\n\n🧪 Testing runProgram');
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
