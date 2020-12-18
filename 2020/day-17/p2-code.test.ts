import {
  // @ts-expect-error
  getActiveCoordinatesFromInputLines,
  getNeighboringCoordinates,
  Coordinate,
  // @ts-expect-error
  getAllCoordinatesToEvaluate,
  getActiveCoordinatesAfterNextCycle,
  getAnswer,
} from './p2-code';

// describe('getActiveCoordinatesFromInputLines', () => {
//   it('returns list of coordinates from the input', () => {
//     const input = ['..#', '#..', '.#.'];

//     const result = getActiveCoordinatesFromInputLines(input);

//     expect(result).toEqual([
//       { x: 2, y: 0, z: 0 },
//       { x: 0, y: 1, z: 0 },
//       { x: 1, y: 2, z: 0 },
//     ]);
//   });
// });

describe('getSurroundingCoordinates', () => {
  it('returns the 80 results fo neighboring locations', () => {
    const input: Coordinate = { w: 0, x: 2, y: 0, z: 0 };

    const result = getNeighboringCoordinates(input);

    expect(result.length).toEqual(80);
  });
});

// describe('getAllCoordinatesToEvaluate', () => {
//   it('returns the correct number of coordinates when given 2 coordinates and one neighbor is overlapping', () => {
//     const input: Coordinate[] = [
//       { w: 0, x: 0, y: 0, z: 0 },
//       { w: 2, x: 2, y: 2, z: 2 },
//     ];
//     // @ts-ignore - Property 'length' does not exist on type 'void'.
//     expect(getAllCoordinatesToEvaluate(input).length).toEqual(53);
//   });
// });

describe('getActiveCoordinatesAfterNextCycle', () => {
  it('does nothing to an active coordinate with 2 active neighbors', () => {
    const targetCoordinate: Coordinate = { w: 0, x: 0, y: 0, z: 0 };
    const activeNeighbors: Coordinate[] = [
      { w: 0, x: 1, y: 0, z: 0 },
      { w: 0, x: 0, y: 1, z: 0 },
    ];
    const allActiveCoordinates = [targetCoordinate, ...activeNeighbors];
    const newActiveCoordinates = getActiveCoordinatesAfterNextCycle(
      allActiveCoordinates
    );
    expect(newActiveCoordinates).toContainEqual(targetCoordinate);
  });
  it('does nothing to an active coordinate with 3 active neighbors', () => {
    const targetCoordinate: Coordinate = { w: 0, x: 0, y: 0, z: 0 };
    const activeNeighbors: Coordinate[] = [
      { w: 0, x: 1, y: 0, z: 0 },
      { w: 0, x: 0, y: 1, z: 0 },
      { w: 0, x: 0, y: 0, z: 1 },
    ];
    const allActiveCoordinates = [targetCoordinate, ...activeNeighbors];
    const newActiveCoordinates = getActiveCoordinatesAfterNextCycle(
      allActiveCoordinates
    );
    expect(newActiveCoordinates).toContainEqual(targetCoordinate);
  });
  it('deactivates an active coordinate with 1 active neighbor', () => {
    const targetCoordinate: Coordinate = { w: 0, x: 0, y: 0, z: 0 };
    const activeNeighbors: Coordinate[] = [{ w: 0, x: 1, y: 0, z: 0 }];
    const allActiveCoordinates = [targetCoordinate, ...activeNeighbors];
    const newActiveCoordinates = getActiveCoordinatesAfterNextCycle(
      allActiveCoordinates
    );
    expect(newActiveCoordinates).not.toContainEqual(targetCoordinate);
  });
  it('deactivates an active coordinate with 4 active neighbors', () => {
    const targetCoordinate: Coordinate = { w: 0, x: 0, y: 0, z: 0 };
    const activeNeighbors: Coordinate[] = [
      { w: 0, x: 1, y: 0, z: 0 },
      { w: 0, x: 0, y: 1, z: 0 },
      { w: 0, x: 0, y: 0, z: 1 },
      { w: 0, x: 0, y: 1, z: 1 },
    ];
    const allActiveCoordinates = [targetCoordinate, ...activeNeighbors];
    const newActiveCoordinates = getActiveCoordinatesAfterNextCycle(
      allActiveCoordinates
    );
    expect(newActiveCoordinates).not.toContainEqual(targetCoordinate);
  });
  it('activates an inactive coordinate with 3 active neighbors', () => {
    const targetCoordinate: Coordinate = { w: 0, x: 0, y: 0, z: 0 };
    const activeNeighbors: Coordinate[] = [
      { w: 0, x: 1, y: 0, z: 0 },
      { w: 0, x: 0, y: 1, z: 0 },
      { w: 0, x: 0, y: 0, z: 1 },
    ];
    const allActiveCoordinates = [...activeNeighbors];
    const newActiveCoordinates = getActiveCoordinatesAfterNextCycle(
      allActiveCoordinates
    );
    expect(newActiveCoordinates).toContainEqual(targetCoordinate);
  });
  it('has the expected number of active coordinates based on the example at https://adventofcode.com/2020/day/17', () => {
    const input = [
      { w: 0, x: 1, y: 0, z: 0 },
      { w: 0, x: 2, y: 1, z: 0 },
      { w: 0, x: 0, y: 2, z: 0 },
      { w: 0, x: 1, y: 2, z: 0 },
      { w: 0, x: 2, y: 2, z: 0 },
    ];
    const newActiveCoordinates = getActiveCoordinatesAfterNextCycle(input);
    expect(newActiveCoordinates.length).toEqual(29);
  });
});

describe('answer', () => {
  it('runs', () => {
    getAnswer();
  });
});

// @ts-expect-error
function sortByWXYZ(a: Coordinate, b: Coordinate) {
  if (a.w === b.w) {
    if (a.x === b.x) {
      if (a.y === b.y) {
        return a.z < b.z ? -1 : a.z > b.z ? 1 : 0;
      } else {
        return a.y < b.y ? -1 : 1;
      }
    } else {
      return a.x < b.x ? -1 : 1;
    }
  } else {
    return a.w < b.w ? -1 : 1;
  }
}
