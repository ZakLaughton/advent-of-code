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

  return coordinates[0] <= maxRowIndex && coordinates[1] <= maxColumnIndex;
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
