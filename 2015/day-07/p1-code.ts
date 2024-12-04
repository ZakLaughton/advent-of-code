import { test } from '../../utils';

type Operation = 'ASSIGN' | 'AND' | 'OR' | 'NOT' | 'LSHIFT' | 'RSHIFT';
type ParsedInstruction = {
  operation: Operation;
  input: (string | number)[];
  assignee: string;
};

/** FUNCTIONS */
function parseInstruction(instruction: string): ParsedInstruction {}

/** TESTS */
test(parseInstruction, ['NOT dq -> dr'], {
  operation: 'NOT',
  input: ['dq'],
  assignee: 'dr',
});
test(parseInstruction, ['kg OR kf -> kh'], {
  operation: 'OR',
  input: ['kg', 'kf'],
  assignee: 'kh',
});
test(parseInstruction, ['44430 -> b'], {
  operation: 'ASSIGN',
  input: [44430],
  assignee: 'b',
});
test(parseInstruction, ['y AND ae -> ag'], {
  operation: 'AND',
  input: ['y', 'ae'],
  assignee: 'ag',
});
test(parseInstruction, ['kk RSHIFT 3 -> km'], {
  operation: 'RSHIFT',
  input: ['kk', 3],
  assignee: 'km',
});
test(parseInstruction, ['bk LSHIFT 1 -> ce'], {
  operation: 'LSHIFT',
  input: ['bk', 1],
  assignee: 'ce',
});
