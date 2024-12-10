export type ParsedEquation = { result: number; operands: number[] };

export function parseInput(input: string[]): ParsedEquation[] {
  const parsedEquations: ParsedEquation[] = [];
  const equationRegEx = /\d+/g;
  for (const line of input) {
    const match = line.match(equationRegEx);
    if (!match) {
      throw new Error(`Could not parse line: ${line}`);
    }
    const result = match[0];
    const operands = match.slice(1).map(Number);
    parsedEquations.push({ result: Number(result), operands });
  }
  return parsedEquations;
}

// Gets the total of the result of all equations that can be
// calculated from the given operands
export function addAllValidEquations(equations: ParsedEquation[]): number {
  let total = 0;
  for (const equation of equations) {
    if (isValidEquation(equation)) {
      total += equation.result;
    }
  }

  return total;
}

export function isValidEquation({
  operands,
  result: target,
}: ParsedEquation): boolean {
  // Remove '||' from this list for part 1 answer
  const operators = ['+', '*', '||'];
  return dfs(0, operands[0]);

  // Does a dept-first search to evaluate all possible outcomes
  function dfs(index: number, currentValue: number): boolean {
    // console.log('running dfs for index, currentValue:', index, currentValue);
    if (index === operands.length - 1) {
      //   console.log(
      //     'End of operands, current value is',
      //     currentValue,
      //     'Target:',
      //     target
      //   );
      return currentValue === target;
    }

    for (const operator of operators) {
      let nextValue = 0;
      if (operator === '+') {
        // console.log('adding it...');
        nextValue = currentValue + operands[index + 1];
      }
      if (operator === '*') {
        // console.log('multiplying it...');
        nextValue = currentValue * operands[index + 1];
      }
      if (operator === '||') {
        nextValue = Number(
          currentValue.toString() + operands[index + 1].toString()
        );
      }

      if (dfs(index + 1, nextValue)) {
        // console.log('returning true');
        return true;
      }
    }
    return false;
  }
}
