// @ts-nocheck
import { test } from '../../utils';

type Operation = 'ASSIGN' | 'AND' | 'OR' | 'NOT' | 'LSHIFT' | 'RSHIFT';
type ParsedInstruction = {
  operation: Operation;
  input: (string | number)[];
  assignee: string;
};
type ParsedOperation = {
  operation: Operation;
  input: (string | number)[];
};

/** FUNCTIONS */
function parseInstruction(instruction: string): ParsedInstruction {
  console.log('Parsing instruction:', instruction);
  const regex = /^(.*?) -> (\w+)/;
  const match = instruction.match(regex);

  const [, operation, assignee] = match;
  console.log('match>>>', match);
}

// parses the operation part of an instruction
function parseOperation(operationInput: string): ParsedOperation {
  //   console.log('Parsing operation:', operation);
  let operation = '';
  let input = [];
  // test for NOT
  if (operationInput.substring(0, 3) === 'NOT') {
    operation = 'NOT';
    const regex = /NOT (\w+)$/;
    const match = operationInput.match(regex);
    input.push(match[1]);

    return { operation, input };
  }
}

/** TESTS */
console.log('\n\n🧪 Testing parseInstruction');
// test(parseInstruction, ['NOT dq -> dr'], {
//   operation: 'NOT',
//   input: ['dq'],
//   assignee: 'dr',
// });
// test(parseInstruction, ['kg OR kf -> kh'], {
//   operation: 'OR',
//   input: ['kg', 'kf'],
//   assignee: 'kh',
// });
// test(parseInstruction, ['44430 -> b'], {
//   operation: 'ASSIGN',
//   input: [44430],
//   assignee: 'b',
// });
// test(parseInstruction, ['y AND ae -> ag'], {
//   operation: 'AND',
//   input: ['y', 'ae'],
//   assignee: 'ag',
// });
// test(parseInstruction, ['kk RSHIFT 3 -> km'], {
//   operation: 'RSHIFT',
//   input: ['kk', 3],
//   assignee: 'km',
// });
// test(parseInstruction, ['bk LSHIFT 1 -> ce'], {
//   operation: 'LSHIFT',
//   input: ['bk', 1],
//   assignee: 'ce',
// });

console.log('\n\n🧪 Testing parseOperation');
test(parseOperation, ['NOT dq'], {
  operation: 'NOT',
  input: ['dq'],
});
// test(parseOperation, ['kg OR kf'], {
//   operation: 'OR',
//   input: ['kg', 'kf'],
//   assignee: 'kh',
// });
// test(parseOperation, ['44430'], {
//   operation: 'ASSIGN',
//   input: [44430],
//   assignee: 'b',
// });
// test(parseOperation, ['y AND ae'], {
//   operation: 'AND',
//   input: ['y', 'ae'],
//   assignee: 'ag',
// });
// test(parseOperation, ['kk RSHIFT 3'], {
//   operation: 'RSHIFT',
//   input: ['kk', 3],
//   assignee: 'km',
// });
// test(parseOperation, ['bk LSHIFT 1'], {
//   operation: 'LSHIFT',
//   input: ['bk', 1],
//   assignee: 'ce',
// });
