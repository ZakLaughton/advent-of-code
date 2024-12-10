// Key is frequency
// Value is list of locations
type AntennaLocations = Record<string, [number, number][]>;

export function countAntinodes(input: string[]): number {
  const antennaLocations = getAntennaLocations(input);
  // create a dictionary of locations of all antennas, key is frequency, value is a array of locations
  // for each frequency, get antinode locations from their locations
  // filter out results not in the grid
  // return total count of antinodes
}

export function getAntennaLocations(grid: string): AntennaLocations {}
