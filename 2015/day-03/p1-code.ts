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
  const deliveriesToHouses: DeliveriesToHouses = { '0,0': 1 };
  let xCoordinate = 0;
  let yCoordinate = 0;

  for (const char of path) {
    if (char === '<') xCoordinate--;
    if (char === '^') yCoordinate++;
    if (char === '>') xCoordinate++;
    if (char === 'v') yCoordinate--;

    const coordinateString = getCoordinateStringFromCoordinates(
      xCoordinate,
      yCoordinate
    );

    if (deliveriesToHouses[coordinateString] === undefined) {
      deliveriesToHouses[coordinateString] = 1;
    } else {
      deliveriesToHouses[coordinateString] += 1;
    }
  }

  return deliveriesToHouses;
}

// Counts how many houses had at least one gift delivered
function countNumberOfDeliveredHouses(
  deliveriesToHouses: DeliveriesToHouses
): number {
  return Object.keys(deliveriesToHouses).length;
}

function getCoordinateStringFromCoordinates(x: number, y: number): string {
  return x + ',' + y;
}

/** TESTS */
test(getNumberOfHousesDeliveredTo, ['>'], 2);
test(getNumberOfHousesDeliveredTo, ['^>v<'], 4);
test(getNumberOfHousesDeliveredTo, ['^v^v^v^v^v'], 2);

test(getHouseDeliveriesFromPath, ['>'], { '0,0': 1, '1,0': 1 });
test(getHouseDeliveriesFromPath, ['^>v<'], {
  '0,0': 2,
  '0,1': 1,
  '1,1': 1,
  '1,0': 1,
});
test(getHouseDeliveriesFromPath, ['^v^v^v^v^v'], { '0,0': 6, '0,1': 5 });

test(getCoordinateStringFromCoordinates, [1, 2], '1,2');
test(getCoordinateStringFromCoordinates, [908, -25], '908,-25');

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
