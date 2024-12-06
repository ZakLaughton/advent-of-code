type Direction = 'up' | 'right' | 'left' | 'down';
type LocationType = '.' | '^' | '#' | '';
type Coordinates = [number, number];
type Grid = string[];

// Counts number of spaces a guard visits before leaving a grid
// The guard starts at ^, and stops before every # and turns right.
// See README in this directory for more detail
export function countVisitedSpaces(grid: Grid): number {
  const visitedSpaces = new Set();
  let guardLocation = getGuardLocation(grid);
  let guardDirection: Direction = 'up';

  while (isInGrid(grid, guardLocation)) {
    const startingLocation = guardLocation;
    const startingDirection = guardDirection;
    const { endingLocation, endingDirection, visitedSpaces } = patrol({
      grid,
      startingLocation,
      startingDirection,
    });
    //   move guard until obstacle or out of bounds
    //   rotate guard
    //   update spaces visited
    //   add spaces visited in this straight path to the set
  }
}

// Returns the starting location of the guard as
// [rowIndex, columnIndex]
export function getGuardLocation(grid: Grid): Coordinates {
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
export function isInGrid(grid: Grid, coordinates: Coordinates): boolean {
  const rowCount = grid.length;
  const columnCount = grid[0].length;

  const maxRowIndex = rowCount - 1;
  const maxColumnIndex = columnCount - 1;

  return coordinates[0] <= maxRowIndex && coordinates[1] <= maxColumnIndex;
}

interface PatrolInput {
  grid: Grid;
  startingLocation: Coordinates;
  startingDirection: Direction;
}
// Moves the guard to an obstacle or until it's out of bounds.
// Returns details about the position, direction, and spaces traveled
export function patrol({
  grid,
  startingLocation,
  startingDirection,
}: PatrolInput): {
  endingLocation: Coordinates;
  endingDirection: Direction;
} {
  const visitedSpaces: Coordinates[] = [];
  let currentLocation = startingLocation;
  let currentDirection = startingDirection;

  const {
    coordinates: nextLocationCoordinates,
    locationType: nextLocationType,
  } = getNextLocation({ grid, currentLocation, currentDirection });

  while (isInGrid(grid, currentLocation) && nextLocationType !== '#')
    // while next space is not an obstacle && current space is in the grid
    // move in direction

    return {
      endingDirection: currentDirection,
      endingLocation: currentLocation,
    };
}

interface GetNextLocationInput {
  grid: Grid;
  currentLocation: Coordinates;
  currentDirection: Direction;
}

export function getNextLocation({
  grid,
  currentLocation,
  currentDirection,
}: GetNextLocationInput): {
  coordinates: Coordinates;
  locationType: '.' | '^' | '#' | '';
} {
  // Amount to change coordinates for moving in any direction
  const directionDelta: Record<Direction, Coordinates> = {
    up: [-1, 0],
    right: [0, 1],
    left: [0, -1],
    down: [1, 0],
  };

  const nextRowIndex = (currentLocation[0] +=
    directionDelta[currentDirection][0]);
  const nextColumnIndex = (currentLocation[1] +=
    directionDelta[currentDirection][1]);
  const nextCoordinates: Coordinates = [nextRowIndex, nextColumnIndex];
  const locationType = (isInGrid(grid, nextCoordinates)
    ? grid[nextRowIndex][nextColumnIndex]
    : '') as LocationType;

  return {
    coordinates: [nextRowIndex, nextColumnIndex],
    locationType,
  };
}
