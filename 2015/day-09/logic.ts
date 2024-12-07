type ParsedPath = {
  start: string;
  end: string;
  distance: number;
};

export function parsePaths(listOfPaths: string[]): ParsedPath[] {
  const pathParseRegex = /(.*) to (.*) = (.*)/;
  const result: ParsedPath[] = [];
  for (const path of listOfPaths) {
    const pathElements = path.match(pathParseRegex) ?? [];
    result.push({
      start: pathElements[1],
      end: pathElements[2],
      distance: Number(pathElements[3]),
    });
  }
  return result;
}
