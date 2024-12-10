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

export function fragmentDisk(diskMap: string, fileBlocks: number[]): number[] {
  const fileBlocksStack = [...fileBlocks];
  const reverseFileBlocksStack = [...fileBlocks.reverse()];
  const fragmentedDisk = [];
  for (
    let i = 0;
    fileBlocksStack.length + reverseFileBlocksStack.length > fileBlocks.length;
    i++
  ) {
    if (
      fileBlocksStack[fileBlocksStack.length - 1] === undefined ||
      reverseFileBlocksStack[reverseFileBlocksStack.length - 1] === undefined
    ) {
      throw new Error('The fileblock stack has a null value for some reason');
    }

    for (let j = 0; j < Number(diskMap[i]); j++) {
      //   on even index, add items from front of file blocks
      //   on odd index, add items from back of the file index
      const fileBlockToAdd =
        i % 2 === 0 ? reverseFileBlocksStack.pop() : fileBlocksStack.pop();
      if (fileBlockToAdd === undefined) throw new Error();
      fragmentedDisk.push(fileBlockToAdd);
      if (
        fileBlocksStack.length + reverseFileBlocksStack.length ===
        fileBlocks.length
      ) {
        break;
      }
    }
  }
  return fragmentedDisk;
}

export function getChecksum(diskMap: number[]): number {
  let total = 0;
  for (let i = 0; i < diskMap.length; i++) {
    total += i * diskMap[i];
  }
  return total;
}
