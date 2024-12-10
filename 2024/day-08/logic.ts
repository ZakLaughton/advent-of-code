// Key is frequency
// Value is list of locations
type AntennaLocations = Record<string, [number, number][]>;

export function countAntinodes(input: string[]): number {
  const antennaLocations = getAntennaLocations(input);
  const antinodeLocations = getAntinodeLocations(antennaLocations);
  // for each frequency, get antinode locations from their locations
  // filter out results not in the grid
  // return total count of antinodes
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
  const antinodeLocations: [number, number][] = [];
  for (const frequency of Object.keys(antennaLocations)) {
    antinodeLocations.concat(
      getAntinodeLocationsForGivenLocations(antennaLocations[frequency])
    );
    // recursively get antinode locations for each antenna
  }
  return antinodeLocations.sort(sortLocationArray);
}

// Takes all locations for a given frequency, returns all possible antinode locations
export function getAntinodeLocationsForGivenLocations(
  locations: [number, number][]
): [number, number][] {
  const antinodeLocations: [number, number][] = [];
  for (const location of locations) {
    const locationsToTestAgainst = locations.slice(1);
    for (const testingLocation of locationsToTestAgainst) {
      antinodeLocations.push(
        getAntinodeLocationsForTwoAntennas(location, testingLocation)
      );
    }
  }
  return antinodeLocations.sort(sortLocationArray);
}

export function getAntinodeLocationsForTwoAntennas(
  antennaA: [number, number],
  antennaB: [number, number]
): [number, number][] {
  const antinodeARow = antennaA[0] + (antennaA[0] - antennaB[0]);
  const antinodeAColumn = antennaA[1] + (antennaA[1] - antennaB[1]);
  const antinodeBRow = antennaB[0] + (antennaB[0] - antennaA[0]);
  const antinodeBColumn = antennaB[1] + (antennaB[1] - antennaA[1]);

  const antinodeLocations: [number, number][] = [
    [antinodeARow, antinodeAColumn],
    [antinodeBRow, antinodeBColumn],
  ];
  return antinodeLocations.sort(sortLocationArray);
}

// Used with .sort to sort a location array by rowIndex, then char index
function sortLocationArray(a: [number, number], b: [number, number]): number {
  if (a[0] !== b[0]) return a[0] - b[0];
  return (a[1] = b[1]);
}
