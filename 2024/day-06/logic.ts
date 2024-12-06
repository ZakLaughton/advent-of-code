// Counts number of spaces a guard visits before leaving a grid
// The guard starts at ^, and stops before every # and turns right.
// See README in this directory for more detail
export function countVisitedSpaces(input: string): number {
  const visitedSpaces = new Set();
  let guardLocation = getGuardLocation(input);

  while (isInGrid(grid, guardLocation)) {
    //   move guard until obstacle or out of bounds
    //   rotate guard
    //   update spaces visited
    //   add spaces visited in this straight path to the set
  }
}

// Returns the starting location of the guard as
// [rowIndex, columnIndex]
export function getGuardLocation(grid: string[]): [number, number] {
  for (const [index, row] of grid.entries()) {
    const column = row.indexOf('^');
    if (column >= 0) {
      // Return coordinates if ^ is found
      return [index, column];
    }
  }
  return [-1, -1]; // Not found
}

// Determines if a set of coordinates is in-bounds for a given grid
export function isInGrid(
  grid: string[],
  guardLocation: [number, number]
): boolean {
  const rowCount = grid.length;
  const columnCount = grid[0].length;

  const maxRowIndex = rowCount - 1;
  const maxColumnIndex = columnCount - 1;

  return guardLocation[0] <= maxRowIndex && guardLocation[1] <= maxColumnIndex;
}
