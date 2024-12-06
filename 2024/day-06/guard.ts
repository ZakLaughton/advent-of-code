import {
  Coordinates,
  Direction,
  getAllPositionsBetweenCoordinates,
  getNextLocation,
  Grid,
  isInGrid,
  LocationType,
} from './grid';

// Counts number of spaces a guard visits before leaving a grid
// The guard starts at ^, and stops before every # and turns right.
// See README in this directory for more detail
export function countVisitedSpaces(grid: Grid): number {
  const visitedLocations = new Set();
  let guardLocation = getGuardLocation(grid);
  let guardDirection: Direction = 'up';

  while (isInGrid(grid, guardLocation)) {
    // Move guard
    const startingLocation = guardLocation;
    const startingDirection = guardDirection;
    const { endingLocation, endingDirection } = patrol({
      grid,
      startingLocation,
      startingDirection,
    });

    guardLocation = endingLocation;
    guardDirection = endingDirection;

    // Log visited locations
    const visitedLocationsFromPatrol = getAllPositionsBetweenCoordinates(
      startingLocation,
      endingLocation
    );

    for (const location of visitedLocationsFromPatrol) {
      if (isInGrid(grid, location)) {
        visitedLocations.add(JSON.stringify(location));
      }
    }
  }
  return visitedLocations.size;
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
  let currentLocation = startingLocation;
  let currentDirection = startingDirection;
  let nextLocation: {
    coordinates: Coordinates;
    type: LocationType;
  } = getNextLocation({ grid, currentLocation, currentDirection });

  while (isInGrid(grid, currentLocation) && nextLocation.type !== '#') {
    currentLocation = nextLocation.coordinates;
    nextLocation = getNextLocation({ grid, currentLocation, currentDirection });

    if (nextLocation.type === '#') {
      currentDirection = turnRight(currentDirection);
    }
  }

  return {
    endingLocation: currentLocation,
    endingDirection: currentDirection,
  };
}

// Returns the new direction after turning right
export function turnRight(currentDirection: Direction): Direction {
  switch (currentDirection) {
    case 'up':
      return 'right';
    case 'right':
      return 'down';
    case 'down':
      return 'left';
    case 'left':
      return 'up';
  }
}
