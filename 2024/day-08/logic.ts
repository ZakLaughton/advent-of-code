// Key is frequency

import { isInGrid } from '../day-06/grid';

// Value is list of locations
type AntennaLocations = Record<string, [number, number][]>;

export function countAntinodes(input: string[]): number {
  const antennaLocations = getAntennaLocations(input);
  const antinodeLocations = getAntinodeLocations(
    antennaLocations
  ).filter((location) => isInGrid(input, location));
  return antinodeLocations.length;
}

export function getAntennaLocations(grid: string[]): AntennaLocations {
  const antennaLocations: AntennaLocations = {};
  for (const [rowIndex, row] of grid.entries()) {
    let charIndex = 0;
    for (const char of row) {
      if (char !== '.') {
        if (antennaLocations[char] === undefined) {
          antennaLocations[char] = [];
        }

        antennaLocations[char].push([rowIndex, charIndex]);
      }
      charIndex++;
    }
  }
  return antennaLocations;
}

export function getAntinodeLocations(
  antennaLocations: AntennaLocations
): [number, number][] {
  let antinodeLocations: [number, number][] = [];
  for (const frequency of Object.keys(antennaLocations)) {
    antinodeLocations = [
      ...antinodeLocations,
      ...getAntinodeLocationsForGivenLocations(antennaLocations[frequency]),
    ];
  }
  antinodeLocations = removeDuplicatesFromLocationArray(antinodeLocations);
  return antinodeLocations.sort(sortLocationArray);
}

// Takes all locations for a given frequency, returns all possible antinode locations
export function getAntinodeLocationsForGivenLocations(
  locations: [number, number][]
): [number, number][] {
  let antinodeLocations: [number, number][] = [];
  for (const [index, location] of locations.entries()) {
    const locationsToTestAgainst = locations.slice(index + 1);
    for (const testingLocation of locationsToTestAgainst) {
      //   console.log('Testing', location, 'against', testingLocation);
      const antinodeLocationsHere = getAntinodeLocationsForTwoAntennas(
        location,
        testingLocation
      );
      antinodeLocations = [...antinodeLocations, ...antinodeLocationsHere];
    }
  }
  return antinodeLocations.sort(sortLocationArray);
}

export function getAntinodeLocationsForTwoAntennas(
  antennaA: [number, number],
  antennaB: [number, number]
): [number, number][] {
  const antinodeARow = antennaA[0] + (antennaB[0] - antennaA[0]) * 2;
  const antinodeAColumn = antennaA[1] + (antennaB[1] - antennaA[1]) * 2;
  const antinodeBRow = antennaB[0] + (antennaA[0] - antennaB[0]) * 2;
  const antinodeBColumn = antennaB[1] + (antennaA[1] - antennaB[1]) * 2;

  const antinodeLocations: [number, number][] = [
    [antinodeARow, antinodeAColumn],
    [antinodeBRow, antinodeBColumn],
  ];
  return antinodeLocations.sort(sortLocationArray);
}

// Used with .sort to sort a location array by rowIndex, then char index
function sortLocationArray(a: [number, number], b: [number, number]): number {
  if (a[0] !== b[0]) return a[0] - b[0];
  return a[1] - b[1];
}

export function removeDuplicatesFromLocationArray(
  locationArray: [number, number][]
) {
  // All unique locations to return
  const uniques = [];
  // Stringified found items to compare against
  const found = new Set();
  for (const location of locationArray) {
    const stringified = JSON.stringify(location);
    if (found.has(stringified)) continue;
    found.add(stringified);
    uniques.push(location);
  }

  return uniques;
}

// PART 2
export function countAntinodesWithHarmonics(input: string[]): number {
  const maxRow = input.length - 1;
  const maxColumn = input[0].length - 1;
  const antennaLocations = getAntennaLocations(input);
  const antinodeLocations = getAntinodeLocationsWithHarmonics(
    antennaLocations,
    maxRow,
    maxColumn
  );
  return antinodeLocations.length;
}

export function getAntinodeLocationsWithHarmonics(
  antennaLocations: AntennaLocations,
  maxRow: number,
  maxColumn: number
): [number, number][] {
  let antinodeLocations: [number, number][] = [];
  for (const frequency of Object.keys(antennaLocations)) {
    antinodeLocations = [
      ...antinodeLocations,
      ...getAntinodeLocationsForGivenLocationsWithHarmonics(
        antennaLocations[frequency],
        maxRow,
        maxColumn
      ),
    ];
  }
  antinodeLocations = removeDuplicatesFromLocationArray(antinodeLocations);
  return antinodeLocations.sort(sortLocationArray);
}

export function getAntinodeLocationsForGivenLocationsWithHarmonics(
  locations: [number, number][],
  maxRow: number,
  maxColumn: number
): [number, number][] {
  let antinodeLocations: [number, number][] = [];
  for (const [index, location] of locations.entries()) {
    const locationsToTestAgainst = locations.slice(index + 1);
    for (const testingLocation of locationsToTestAgainst) {
      //   console.log('Testing', location, 'against', testingLocation);
      const antinodeLocationsHere = getAntinodeLocationsForTwoAntennasWithHarmonics(
        location,
        testingLocation,
        maxRow,
        maxColumn
      );
      antinodeLocations = [...antinodeLocations, ...antinodeLocationsHere];
    }
  }
  return removeDuplicatesFromLocationArray(
    antinodeLocations.sort(sortLocationArray)
  );
}

export function getAntinodeLocationsForTwoAntennasWithHarmonics(
  antennaA: [number, number],
  antennaB: [number, number],
  maxRow: number,
  maxColumn: number
): [number, number][] {
  const antinodeLocations: [number, number][] = [];
  const delta = [antennaA[0] - antennaB[0], antennaA[1] - antennaB[1]];
  let marker: [number, number] = [...antennaA];
  // 1 direction from A
  while (
    marker[0] >= 0 &&
    marker[1] >= 0 &&
    marker[0] <= maxRow &&
    marker[1] <= maxColumn
  ) {
    antinodeLocations.push([...marker]);
    marker[0] += delta[0];
    marker[1] += delta[1];
  }

  // other direction from A
  marker = [antennaA[0] - delta[0], antennaA[1] - delta[1]];
  while (
    marker[0] >= 0 &&
    marker[1] >= 0 &&
    marker[0] <= maxRow &&
    marker[1] <= maxColumn
  ) {
    antinodeLocations.push([...marker]);
    marker[0] -= delta[0];
    marker[1] -= delta[1];
  }

  return antinodeLocations.sort(sortLocationArray);
}
