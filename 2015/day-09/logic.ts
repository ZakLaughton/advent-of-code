type ParsedPath = {
  start: string;
  end: string;
  distance: number;
};

type Neighbor = {
  neighbor: string;
  distance: number;
};

type Graph = Map<string, Neighbor[]>;

export function parsePaths(listOfPaths: string[]): ParsedPath[] {
  const pathParseRegex = /(.*) to (.*) = (.*)/;
  const result: ParsedPath[] = [];
  for (const path of listOfPaths) {
    const pathElements = path.match(pathParseRegex) ?? [];
    result.push({
      start: pathElements[1],
      end: pathElements[2],
      distance: Number(pathElements[3]),
    });
  }
  return result;
}

export function buildLocationGraph(parsedPaths: ParsedPath[]): Graph {
  const graph: Graph = new Map();

  for (const path of parsedPaths) {
    const { start, end, distance } = path;
    addEdge({ start, end, distance });
    addEdge({ start: end, end: start, distance });
  }

  return graph;

  function addEdge({ start, end, distance }: ParsedPath): void {
    if (!graph.has(start)) {
      graph.set(start, []);
    }

    const neighbors = graph.get(start);
    if (!neighbors?.some((edge) => edge.neighbor === end)) {
      neighbors?.push({ neighbor: end, distance });
    }
  }
}

// Finds shortest path to visit all locations
// Starting and ending at any location
export function findShortestPathToAllLocations(graph: Graph): number {
  let shortestDistance = Infinity;

  for (const [location] of graph) {
    const seen = new Set<string>([location]);
    const minimumDistance = traverseGraphForMinimumDistance(
      graph,
      location,
      seen,
      0
    );
    shortestDistance = Math.min(shortestDistance, minimumDistance);
  }
  return shortestDistance;
}

function traverseGraphForMinimumDistance(
  graph: Graph,
  currentLocation: string,
  seen: Set<string>,
  currentDistance: number
): number {
  // Base case: If all locations have been visited
  if (seen.size === graph.size) {
    return currentDistance;
  }

  let shortestPath = Infinity;

  // Explore all neighbors
  for (const { neighbor, distance } of graph.get(currentLocation) || []) {
    if (!seen.has(neighbor)) {
      seen.add(neighbor);
      shortestPath = Math.min(
        shortestPath,
        traverseGraphForMinimumDistance(
          graph,
          neighbor,
          seen,
          currentDistance + distance
        )
      );
      seen.delete(neighbor); // Backtrack
    }
  }

  return shortestPath;
}

// Finds shortest path to visit all locations
// Starting and ending at any location
export function findLongestPathToAllLocations(graph: Graph): number {
  let longestDistance = -Infinity;

  for (const [location] of graph) {
    const seen = new Set<string>([location]);
    const maximumDistance = traverseGraphForMaximumDistance(
      graph,
      location,
      seen,
      0
    );
    longestDistance = Math.max(longestDistance, maximumDistance);
  }
  return longestDistance;
}

function traverseGraphForMaximumDistance(
  graph: Graph,
  currentLocation: string,
  seen: Set<string>,
  currentDistance: number
): number {
  // Base case: If all locations have been visited
  if (seen.size === graph.size) {
    return currentDistance;
  }

  let longestPath = -Infinity;

  // Explore all neighbors
  for (const { neighbor, distance } of graph.get(currentLocation) || []) {
    if (!seen.has(neighbor)) {
      seen.add(neighbor);
      longestPath = Math.max(
        longestPath,
        traverseGraphForMaximumDistance(
          graph,
          neighbor,
          seen,
          currentDistance + distance
        )
      );
      seen.delete(neighbor); // Backtrack
    }
  }

  return longestPath;
}
