export type LocationType = '.' | '^' | '#' | '';
export type Coordinates = [number, number];
export type Grid = string[];
export type Direction = 'up' | 'right' | 'left' | 'down';

// Determines if a set of coordinates is in-bounds for a given grid
export function isInGrid(grid: Grid, coordinates: Coordinates): boolean {
  const rowCount = grid.length;
  const columnCount = grid[0].length;

  const maxRowIndex = rowCount - 1;
  const maxColumnIndex = columnCount - 1;

  const areCoordinatesPositive = coordinates[0] >= 0 && coordinates[1] >= 0;
  const areCoordinatesWithinGridUpperBounds =
    coordinates[0] <= maxRowIndex && coordinates[1] <= maxColumnIndex;

  return areCoordinatesPositive && areCoordinatesWithinGridUpperBounds;
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
  type: '.' | '^' | '#' | '';
} {
  //   console.log('getting next location for', currentLocation, currentDirection);
  // Amount to change coordinates for moving in any direction
  const directionDelta: Record<Direction, Coordinates> = {
    up: [-1, 0],
    right: [0, 1],
    left: [0, -1],
    down: [1, 0],
  };

  const nextCoordinates: Coordinates = [
    currentLocation[0] + directionDelta[currentDirection][0],
    currentLocation[1] + directionDelta[currentDirection][1],
  ];

  const locationType = (isInGrid(grid, nextCoordinates)
    ? grid[nextCoordinates[0]][nextCoordinates[1]]
    : '') as LocationType;
  //   console.log('next location is:', {
  //     coordinates: [nextCoordinates[0], nextCoordinates[1]],
  //     locationType,
  //   });
  return {
    coordinates: [nextCoordinates[0], nextCoordinates[1]],
    type: locationType,
  };
}

// Returns all spaces travelled between two points,
// inclusive of the start and end
export function getAllPositionsBetweenCoordinates(
  start: Coordinates,
  end: Coordinates
): Coordinates[] {
  const positionsVisited: Coordinates[] = [];
  // process row movement
  if (start[0] !== end[0]) {
    const column = start[1];
    const minRow = Math.min(start[0], end[0]);
    const maxRow = Math.max(start[0], end[0]);

    for (let i = minRow; i <= maxRow; i++) {
      positionsVisited.push([i, column]);
    }
  }

  if (start[1] !== end[1]) {
    const row = start[0];
    const minColumn = Math.min(start[1], end[1]);
    const maxColumn = Math.max(start[1], end[1]);

    for (let i = minColumn; i <= maxColumn; i++) {
      positionsVisited.push([row, i]);
    }
  }

  return positionsVisited;
}
