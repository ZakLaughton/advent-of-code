import {
  Coordinate,
  getAllCoordinatesToEvaluate,
  getActiveCoordinatesFromInputLines,
  getNeighboringCoordinates,
  getActiveCoordinatesAfterNextCycle,
  getAnswer,
} from './p2-code';

describe.skip('getAnswer', () => {
  it('has the same amount of results as the example at https://adventofcode.com/2020/day/17', () => {
    getAnswer(['.#.', '..#', '###']);
  });
});

describe('getActiveCoordinatesFromInputLines', () => {
  it('returns list of coordinates from the input', () => {
    const input = ['..#', '#..', '.#.'];

    const result = getActiveCoordinatesFromInputLines(input);

    expect(result).toEqual(new Set([`0,2,0,0`, `0,0,1,0`, `0,1,2,0`]));
  });
});

describe('getNeighboringCoordinates', () => {
  it('returns the 80 results for neighboring locations', () => {
    const input: Coordinate = `0,2,0,0`;

    const result = getNeighboringCoordinates(input);

    expect(result.length).toEqual(80);
    expect(result).toContain(`0,2,0,1`);
    expect(result).not.toContain(`0,2,0,0`);
  });
});

describe('getAllCoordinatesToEvaluate', () => {
  it('returns the correct number of coordinates when given 2 coordinates and one neighbor is overlapping', () => {
    const input: Coordinate[] = [`0,0,0,0`, `2,2,2,2`];
    // @ts-ignore - Property 'length' does not exist on type 'void'.
    const allCoordinatesToEvaluate = getAllCoordinatesToEvaluate(input);
    expect(allCoordinatesToEvaluate.size).toEqual(161);
  });
});

describe('getActiveCoordinatesAfterNextCycle', () => {
  it('does nothing to an active coordinate with 2 active neighbors', () => {
    const targetCoordinate: Coordinate = `0,0,0,0`;
    const activeNeighbors: Coordinate[] = [`0,1,0,0`, `0,0,1,0`];
    const allActiveCoordinates = new Set([
      targetCoordinate,
      ...activeNeighbors,
    ]);
    const newActiveCoordinates = getActiveCoordinatesAfterNextCycle(
      allActiveCoordinates
    );
    expect(newActiveCoordinates).toContain(targetCoordinate);
  });
  it('does nothing to an active coordinate with 3 active neighbors', () => {
    const targetCoordinate: Coordinate = `0,0,0,0`;
    const activeNeighbors: Coordinate[] = [`0,1,0,0`, `0,0,1,0`, `0,0,0,1`];
    const allActiveCoordinates = new Set([
      targetCoordinate,
      ...activeNeighbors,
    ]);
    const newActiveCoordinates = getActiveCoordinatesAfterNextCycle(
      allActiveCoordinates
    );
    expect(newActiveCoordinates).toContainEqual(targetCoordinate);
  });
  it('deactivates an active coordinate with 1 active neighbor', () => {
    const targetCoordinate: Coordinate = `0,0,0,0`;
    const activeNeighbors: Coordinate[] = [`0,1,0,0`];
    const allActiveCoordinates = new Set([
      targetCoordinate,
      ...activeNeighbors,
    ]);
    const newActiveCoordinates = getActiveCoordinatesAfterNextCycle(
      allActiveCoordinates
    );
    expect(newActiveCoordinates).not.toContainEqual(targetCoordinate);
  });
  it('deactivates an active coordinate with 4 active neighbors', () => {
    const targetCoordinate: Coordinate = `0,0,0,0`;
    const activeNeighbors: Coordinate[] = [
      `0,1,0,0`,
      `0,0,1,0`,
      `0,0,0,1`,
      `0,0,1,1`,
    ];
    const allActiveCoordinates = new Set([
      targetCoordinate,
      ...activeNeighbors,
    ]);
    const newActiveCoordinates = getActiveCoordinatesAfterNextCycle(
      allActiveCoordinates
    );
    expect(newActiveCoordinates).not.toContainEqual(targetCoordinate);
  });
  it('activates an inactive coordinate with 3 active neighbors', () => {
    const targetCoordinate: Coordinate = `0,0,0,0`;
    const activeNeighbors: Coordinate[] = [`0,1,0,0`, `0,0,1,0`, `0,0,0,1`];
    const allActiveCoordinates = new Set([...activeNeighbors]);
    const newActiveCoordinates = getActiveCoordinatesAfterNextCycle(
      allActiveCoordinates
    );
    expect(newActiveCoordinates).toContainEqual(targetCoordinate);
  });
  it('has the expected number of active coordinates based on the example at https://adventofcode.com/2020/day/17', () => {
    const input = new Set([
      `0,1,0,0`,
      `0,2,1,0`,
      `0,0,2,0`,
      `0,1,2,0`,
      `0,2,2,0`,
    ]);
    const newActiveCoordinates = getActiveCoordinatesAfterNextCycle(input);
    expect(newActiveCoordinates.size).toEqual(29);
  });
});

// function sortByWXYZ(a: Coordinate, b: Coordinate) {
//   if (a.w === b.w) {
//     if (a.x === b.x) {
//       if (a.y === b.y) {
//         return a.z < b.z ? -1 : a.z > b.z ? 1 : 0;
//       } else {
//         return a.y < b.y ? -1 : 1;
//       }
//     } else {
//       return a.x < b.x ? -1 : 1;
//     }
//   } else {
//     return a.w < b.w ? -1 : 1;
//   }
// }
