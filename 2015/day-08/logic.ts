export function countStringLiteralChars(input: string): number {
  return input.length;
}

export function countInMemoryChars(input: string): number {
  return JSON.parse(input).length;
}
