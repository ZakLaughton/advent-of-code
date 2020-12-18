const fs = require('fs');

const inputPath = `${__dirname}/p1-input.txt`;
const data = fs
  .readFileSync(inputPath, 'utf8')
  .split('\n')
  .map((wireDirections) => wireDirections.split(','));

const getPathCoordinatesFromDirections = (directions) => {
  const startingStatus = { currentPosition: [0, 0], pathTravelled: [] };
  const { pathTravelled } = directions.reduce(
    getPathCoordinatesFromDirection,
    startingStatus
  );
  return pathTravelled;
};

const getPathCoordinatesFromDirection = (currentStatus, direction) => {
  const { currentPosition, pathTravelled } = currentStatus;
  const endPoint = getEndPoint(currentPosition, direction);
  const addedCoordinates = getStraightLineCoordinates(
    currentPosition,
    endPoint
  );
  return {
    currentPosition: endPoint,
    pathTravelled: [...pathTravelled, ...addedCoordinates],
  };
};

const getEndPoint = (startingPoint, direction) => {
  const orientation = direction[0];
  const distance = Number(direction.slice(1));
  const startingX = startingPoint[0];
  const startingY = startingPoint[1];

  switch (orientation) {
    case 'U':
      return [startingX, startingY + distance];
    case 'R':
      return [startingX + distance, startingY];
    case 'L':
      return [startingX - distance, startingY];
    case 'D':
      return [startingX, startingY - distance];
  }
};

const getStraightLineCoordinates = (startPoint, endPoint) => {
  const startX = startPoint[0];
  const startY = startPoint[1];
  const endX = endPoint[0];
  const endY = endPoint[1];

  const xPath = getAllNumbersBetween(startX, endX);
  const yPath = getAllNumbersBetween(startY, endY);
  const lineCoordinates =
    xPath.length === 0
      ? yPath.map((yCoordinate) => [startX, yCoordinate])
      : xPath.map((xCoordinate) => [xCoordinate, startY]);

  return lineCoordinates;
};

const getAllNumbersBetween = (startNumber, endNumber) => {
  let returnArray = [];
  if (startNumber === endNumber) {
    return returnArray;
  }
  if (startNumber < endNumber) {
    for (let num = startNumber + 1; num <= endNumber; num++) {
      returnArray.push(num);
    }
  }

  if (startNumber > endNumber) {
    for (let num = startNumber - 1; num >= endNumber; num--) {
      returnArray.push(num);
    }
  }

  return returnArray;
};

const findFirstCrossingPoint = (path1, path2) => {
  return path1.find((path1Coordinate) =>
    path2.find((path2Coordinate) =>
      doCoordinatesMatch(path1Coordinate, path2Coordinate)
    )
  );
};

const doCoordinatesMatch = (coordinate1, coordinate2) =>
  coordinate1[0] === coordinate2[0] && coordinate1[1] === coordinate2[1];

const getManhattanDistance = (point1, point2) =>
  Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);

const cord0Path = getPathCoordinatesFromDirections(data[0]);
const cord1Path = getPathCoordinatesFromDirections(data[1]);
const firstCrossingPoint = findFirstCrossingPoint(cord0Path, cord1Path);
const distanceFromOrigin = getManhattanDistance([0, 0], firstCrossingPoint);
console.log(distanceFromOrigin);
