import { getTextInputFromFile, test } from '../../utils';

/*
Number of deliveries to each house.
Houses are identified by their coordinates
x,y coordinates should be in the format "23,2"
*/
type DeliveriesToHouses = {
  [key: string]: number;
};

const input = getTextInputFromFile('./input.txt');
console.log('ANSWER>>>', getNumberOfHousesDeliveredTo(input));

/** FUNCTIONS */

function getNumberOfHousesDeliveredTo(input: string): number {
  const housesDeliveredTo = getHouseDeliveriesFromPath(input);
  return countNumberOfDeliveredHouses(housesDeliveredTo);
}

function getHouseDeliveriesFromPath(path: string): DeliveriesToHouses {
  const deliveriesToHouses: DeliveriesToHouses = { '0,0': 2 };
  let isRoboSantasTurn = false;
  let coordinatesRoboSanta = [0, 0];
  let coordinatesSanta = [0, 0];

  for (const char of path) {
    let stringCoordinates = '';
    if (!isRoboSantasTurn) {
      coordinatesSanta = getNewCoordinatesFromDirection(coordinatesSanta, char);
      stringCoordinates = getCoordinateStringFromCoordinates(coordinatesSanta);
    } else {
      coordinatesRoboSanta = getNewCoordinatesFromDirection(
        coordinatesRoboSanta,
        char
      );
      stringCoordinates = getCoordinateStringFromCoordinates(
        coordinatesRoboSanta
      );
    }
    // console.log(
    //   'isrobosantasturn, coordinates:',
    //   isRoboSantasTurn,
    //   stringCoordinates
    // );

    if (deliveriesToHouses[stringCoordinates] === undefined) {
      deliveriesToHouses[stringCoordinates] = 1;
    } else {
      deliveriesToHouses[stringCoordinates] += 1;
    }

    isRoboSantasTurn = !isRoboSantasTurn;
  }

  return deliveriesToHouses;
}

// Counts how many houses had at least one gift delivered
function countNumberOfDeliveredHouses(
  deliveriesToHouses: DeliveriesToHouses
): number {
  return Object.keys(deliveriesToHouses).length;
}

function getCoordinateStringFromCoordinates(coordinates: number[]): string {
  return coordinates[0] + ',' + coordinates[1];
}

function getNewCoordinatesFromDirection(
  startingCoordinate: number[],
  direction: string
): number[] {
  const result = [...startingCoordinate];
  if (direction === '<') result[0]--;
  if (direction === '^') result[1]++;
  if (direction === '>') result[0]++;
  if (direction === 'v') result[1]--;
  return result;
}

/** TESTS */
console.log('\n\n🧪 Testing getNumberOfHousesDeliveredTo');
test(getNumberOfHousesDeliveredTo, ['^v'], 3);
test(getNumberOfHousesDeliveredTo, ['^>v<'], 3);
test(getNumberOfHousesDeliveredTo, ['^v^v^v^v^v'], 11);

console.log('\n\n🧪 Testing getNewCoordinatesFromDirection');
test(getNewCoordinatesFromDirection, [[0, 0], 'v'], [0, -1]);
test(getNewCoordinatesFromDirection, [[0, 0], '<'], [-1, 0]);
test(getNewCoordinatesFromDirection, [[0, 0], '^'], [0, 1]);
test(getNewCoordinatesFromDirection, [[0, 0], '>'], [1, 0]);

console.log('\n\n🧪 Testing getHouseDeliveriesFromPath');
test(getHouseDeliveriesFromPath, ['>'], { '0,0': 2, '1,0': 1 });
test(getHouseDeliveriesFromPath, ['^v'], { '0,0': 2, '0,1': 1, '0,-1': 1 });
test(getHouseDeliveriesFromPath, ['^>v<'], {
  '0,0': 4,
  '0,1': 1,
  '1,0': 1,
});

console.log('\n\n🧪 Testing getCoordinateStringFromCoordinates');
test(getCoordinateStringFromCoordinates, [[1, 2]], '1,2');
test(getCoordinateStringFromCoordinates, [[908, -25]], '908,-25');

console.log('\n\n🧪 Testing countNumberOfDeliveredHouses');
test(countNumberOfDeliveredHouses, [{ '0,0': 1, '1,0': 1 }], 2);
test(
  countNumberOfDeliveredHouses,
  [
    {
      '0,0': 2,
      '0,1': 1,
      '1,1': 1,
      '1,0': 1,
    },
  ],
  4
);
test(countNumberOfDeliveredHouses, [{ '0,0': 6, '0,1': 5 }], 2);
