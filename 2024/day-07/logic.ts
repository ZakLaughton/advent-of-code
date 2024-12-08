type ParsedEquation = { result: number; operands: number[] };

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
