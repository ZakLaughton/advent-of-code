// NOTE FOR WHEN YOU COME BACK. Currently you tests are failing because of the way you pass the last location
// There's currently not a reliable way to know if the the locations ended due to looping or due to leaving

import {
  Coordinates,
  Direction,
  getAllPositionsBetweenCoordinates,
  getNextLocation,
  Grid,
  isInGrid,
  LocationType,
  placeObstructionOnGrid,
} from './grid';

interface StopLocation {
  coordinates: Coordinates;
  direction: Direction;
}

// Counts number of spaces a guard visits before leaving a grid
// The guard starts at ^, and stops before every # and turns right.
// See README in this directory for more detail
export function getVisitedLocations(grid: Grid): Coordinates[] {
  let stopLocations: StopLocation[] = [];

  let guardLocation = getGuardLocation(grid);
  let visitedLocations: Coordinates[] = [guardLocation];
  let guardDirection: Direction = 'up';

  while (isInGrid(grid, guardLocation)) {
    // Move guard

    const startingLocation = guardLocation;
    const startingDirection = guardDirection;
    // console.log(
    //   'Moving guard, starting at:',
    //   startingLocation,
    //   startingDirection
    // );
    const { endingLocation, endingDirection } = patrol({
      grid,
      startingLocation,
      startingDirection,
    });
    if (endingLocation === undefined) {
      console.log(
        'Undefined ending location after starting at:',
        startingLocation,
        startingDirection
      );
    }
    stopLocations.push({
      coordinates: endingLocation,
      direction: endingDirection,
    });

    guardLocation = endingLocation;
    guardDirection = endingDirection;

    // Log visited locations
    const visitedLocationsFromPatrol = getAllPositionsBetweenCoordinates(
      startingLocation,
      endingLocation
    );

    visitedLocations = [...visitedLocations, ...visitedLocationsFromPatrol];

    if (areStopLocationsLooping(stopLocations)) break;
  }

  return visitedLocations;
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
  }

  if (nextLocation.type === '#') {
    currentDirection = turnRight(currentDirection);
  }
  return {
    endingLocation: currentLocation,
    endingDirection: currentDirection,
  };
}

// Looks at locations a guard has stopped to see if it's in a
// never-ending loop
export function areStopLocationsLooping(
  stopLocations: StopLocation[]
): boolean {
  if (stopLocations.length < 5) {
    return false;
  }
  const lastStopLocation = stopLocations[stopLocations.length - 1];
  const previousStopLocations = stopLocations.slice(0, -1);

  if (
    previousStopLocations.some((stopLocation) =>
      areStopLocationsEquivalent(stopLocation, lastStopLocation)
    )
  ) {
    return true;
  }
  return false;
}

function areStopLocationsEquivalent(
  stopLocationA: StopLocation,
  stopLocationB: StopLocation
): boolean {
  if (
    stopLocationA.coordinates[0] === stopLocationB.coordinates[0] &&
    stopLocationA.coordinates[1] === stopLocationB.coordinates[1] &&
    stopLocationA.direction === stopLocationB.direction
  ) {
    return true;
  }
  return false;
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

// Finds all locations where adding an obstruction would cause the
// guard to never exit
export function findLoopingObstructions(
  grid: Grid,
  visitedLocationsOnClearPath: Coordinates[]
): Coordinates[] {
  const obstructionLocationPossibilities = visitedLocationsOnClearPath
    .slice(1)
    .filter((location) => isInGrid(grid, location)); // Remove starting position
  let loopingObstructionLocations: Coordinates[] = [];

  // TODO: FInd a better way to remove duplicates from the array before looping through
  let testedLocationCandidates: Coordinates[] = [];
  for (const locationCandidate of obstructionLocationPossibilities) {
    // console.log('Trying location candidate:', locationCandidate);

    if (
      testedLocationCandidates.some(
        (testedLocationCandidate) =>
          JSON.stringify(testedLocationCandidate) ===
          JSON.stringify(locationCandidate)
      )
    ) {
      continue;
    }
    const obstructedGrid = placeObstructionOnGrid(grid, locationCandidate);
    const visitedLocations = getVisitedLocations(obstructedGrid);
    // console.log('🚀 ~ visitedLocations:', visitedLocations);

    const lastLocation = visitedLocations[visitedLocations.length - 1];
    // console.log('🚀 ~ lastLocation:', lastLocation);

    // Did the guard get stuck in a loop?
    if (isInGrid(obstructedGrid, lastLocation)) {
      //   console.log('!! PUSHING TO LOOPINGOBSTRUCTIONLOCATIONS');
      loopingObstructionLocations.push(locationCandidate);
    }
    testedLocationCandidates.push(locationCandidate);
  }

  return loopingObstructionLocations;
}
