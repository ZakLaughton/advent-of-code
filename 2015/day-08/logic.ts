export function countLength(input: string): number {
  //   console.log('input:', input, 'length:', input.length);
  return input.length;
}

export function countParsedLength(input: string): number {
  return JSON.parse(input).length;
}

export function countEncodedLength(input: string): number {
  return JSON.stringify(input).length;
}
