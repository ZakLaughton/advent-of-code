import {
  getActiveCoordinatesFromInputLines,
  getNeighboringCoordinates,
  Coordinate,
  getAllCoordinatesToEvaluate,
  getActiveCoordinatesAfterNextCycle,
} from './p1-code';

describe('getActiveCoordinatesFromInputLines', () => {
  it('returns list of coordinates from the input', () => {
    const input = ['..#', '#..', '.#.'];

    const result = getActiveCoordinatesFromInputLines(input);

    expect(result).toEqual([
      { x: 2, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 1, y: 2, z: 0 },
    ]);
  });
});

describe('getSurroundingCoordinates', () => {
  it('returns the 26 coordinates of neighboring locations', () => {
    const input: Coordinate = { x: 2, y: 0, z: 0 };

    const result = getNeighboringCoordinates(input);

    expect(result.sort(sortByXYZ)).toEqual([
      { x: 1, y: -1, z: -1 },
      { x: 1, y: -1, z: 0 },
      { x: 1, y: -1, z: 1 },
      { x: 1, y: 0, z: -1 },
      { x: 1, y: 0, z: 0 },
      { x: 1, y: 0, z: 1 },
      { x: 1, y: 1, z: -1 },
      { x: 1, y: 1, z: 0 },
      { x: 1, y: 1, z: 1 },
      { x: 2, y: -1, z: -1 },
      { x: 2, y: -1, z: 0 },
      { x: 2, y: -1, z: 1 },
      { x: 2, y: 0, z: -1 },
      { x: 2, y: 0, z: 1 },
      { x: 2, y: 1, z: -1 },
      { x: 2, y: 1, z: 0 },
      { x: 2, y: 1, z: 1 },
      { x: 3, y: -1, z: -1 },
      { x: 3, y: -1, z: 0 },
      { x: 3, y: -1, z: 1 },
      { x: 3, y: 0, z: -1 },
      { x: 3, y: 0, z: 0 },
      { x: 3, y: 0, z: 1 },
      { x: 3, y: 1, z: -1 },
      { x: 3, y: 1, z: 0 },
      { x: 3, y: 1, z: 1 },
    ]);
  });
});

describe('getAllCoordinatesToEvaluate', () => {
  it('returns the correct number of coordinates when given 2 coordinates and one neighbor is overlapping', () => {
    const input: Coordinate[] = [
      { x: 0, y: 0, z: 0 },
      { x: 2, y: 2, z: 2 },
    ];
    // @ts-ignore - Property 'length' does not exist on type 'void'.
    expect(getAllCoordinatesToEvaluate(input).length).toEqual(53);
  });
});

describe('getActiveCoordinatesAfterNextCycle', () => {
  it('does nothing to an active coordinate with 2 active neighbors', () => {
    const targetCoordinate: Coordinate = { x: 0, y: 0, z: 0 };
    const activeNeighbors: Coordinate[] = [
      { x: 1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
    ];
    const allActiveCoordinates = [targetCoordinate, ...activeNeighbors];
    const newActiveCoordinates = getActiveCoordinatesAfterNextCycle(
      allActiveCoordinates
    );
    expect(newActiveCoordinates).toContainEqual(targetCoordinate);
  });
  it('does nothing to an active coordinate with 3 active neighbors', () => {
    const targetCoordinate: Coordinate = { x: 0, y: 0, z: 0 };
    const activeNeighbors: Coordinate[] = [
      { x: 1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 0, y: 0, z: 1 },
    ];
    const allActiveCoordinates = [targetCoordinate, ...activeNeighbors];
    const newActiveCoordinates = getActiveCoordinatesAfterNextCycle(
      allActiveCoordinates
    );
    expect(newActiveCoordinates).toContainEqual(targetCoordinate);
  });
  it('deactivates an active coordinate with 1 active neighbor', () => {
    const targetCoordinate: Coordinate = { x: 0, y: 0, z: 0 };
    const activeNeighbors: Coordinate[] = [{ x: 1, y: 0, z: 0 }];
    const allActiveCoordinates = [targetCoordinate, ...activeNeighbors];
    const newActiveCoordinates = getActiveCoordinatesAfterNextCycle(
      allActiveCoordinates
    );
    expect(newActiveCoordinates).not.toContainEqual(targetCoordinate);
  });
  it('deactivates an active coordinate with 4 active neighbors', () => {
    const targetCoordinate: Coordinate = { x: 0, y: 0, z: 0 };
    const activeNeighbors: Coordinate[] = [
      { x: 1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 0, y: 0, z: 1 },
      { x: 0, y: 1, z: 1 },
    ];
    const allActiveCoordinates = [targetCoordinate, ...activeNeighbors];
    const newActiveCoordinates = getActiveCoordinatesAfterNextCycle(
      allActiveCoordinates
    );
    expect(newActiveCoordinates).not.toContainEqual(targetCoordinate);
  });
  it('activates an inactive coordinate with 3 active neighbors', () => {
    const targetCoordinate: Coordinate = { x: 0, y: 0, z: 0 };
    const activeNeighbors: Coordinate[] = [
      { x: 1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 0, y: 0, z: 1 },
    ];
    const allActiveCoordinates = [...activeNeighbors];
    const newActiveCoordinates = getActiveCoordinatesAfterNextCycle(
      allActiveCoordinates
    );
    expect(newActiveCoordinates).toContainEqual(targetCoordinate);
  });
  it('has the expected number of active coordinates based on the example at https://adventofcode.com/2020/day/17', () => {
    const input = [
      { x: 1, y: 0, z: 0 },
      { x: 2, y: 1, z: 0 },
      { x: 0, y: 2, z: 0 },
      { x: 1, y: 2, z: 0 },
      { x: 2, y: 2, z: 0 },
    ];
    const newActiveCoordinates = getActiveCoordinatesAfterNextCycle(input);
    expect(newActiveCoordinates.length).toEqual(11);
  });
});

function sortByXYZ(a: Coordinate, b: Coordinate) {
  if (a.x === b.x) {
    if (a.y === b.y) {
      return a.z < b.z ? -1 : a.z > b.z ? 1 : 0;
    } else {
      return a.y < b.y ? -1 : 1;
    }
  } else {
    return a.x < b.x ? -1 : 1;
  }
}
