// Returns the full string of file blocks with no gaps present
export function getAllFileBlocks(diskMap: string): number[] {
  const fileBlocks = [];
  let fileNumber = 0;
  for (let i = 0; i < diskMap.length; i++) {
    // Skip odd indices, which represent empty space
    if (i % 2 === 1) {
      continue;
    }
    for (let j = 0; j < Number(diskMap[i]); j++) {
      fileBlocks.push(fileNumber);
    }
    fileNumber++;
  }
  return fileBlocks;
}
