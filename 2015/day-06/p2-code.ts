import { getTextInputFromFileInLines, test } from '../../utils';

/* TODO: Improvement ideas
- This is verrry slow. Took several minutes to execute. Will be much faster if using a 2D array instead
- remove the redundant for loops
*/

/** TYPES */
type Command = 'toggle' | 'turn off' | 'turn on';
type Coordinates = [number, number];
interface ParsedInstruction {
  command: Command;
  start: Coordinates;
  end: Coordinates;
}
// Holds a set of turned on lights with their brightness as the value
type LightStatuses = Record<string, number>;

/** MAIN */
const input = getTextInputFromFileInLines('./input.txt');
console.log('ANSWER>>>', executeInstructions(input));

/** FUNCTIONS */
// Executes a set of instructions for the lights and returns the total brightness of all lights combined afterwards
function executeInstructions(input: string[]): number {
  let turnedOnLights: LightStatuses = {};

  let count = 0;
  for (const instruction of input) {
    console.log('Processing', instruction, '(', count, '/', input.length, ')');
    const parsedInstruction = parseInstruction(instruction);
    turnedOnLights = executeInstruction(parsedInstruction, turnedOnLights);
    count++;
  }

  let totalBrightness = 0;
  for (const brightness of Object.values(turnedOnLights)) {
    totalBrightness += brightness;
  }

  return totalBrightness;
}

// Returns the command, start coordinates, and end coordinates from a given instruction
function parseInstruction(instruction: string): ParsedInstruction {
  //   console.log('Parsing instruction:', instruction);
  const regex = /^(toggle|turn off|turn on) (\d+),(\d+) through (\d+),(\d+)$/;
  const match = instruction.match(regex);

  if (!match) {
    throw new Error(); // Handle invalid input gracefully
  }

  const [, command, x1, y1, x2, y2] = match;

  return {
    command: command as Command, // Type assertion since regex ensures it's valid
    start: [Number(x1), Number(y1)],
    end: [Number(x2), Number(y2)],
  };
}

// Modifies a light set given instructions
function executeInstruction(
  parsedInstruction: ParsedInstruction,
  lightStatuses: LightStatuses
): LightStatuses {
  const updatedLightStatuses = { ...lightStatuses };
  if (parsedInstruction.command === 'turn on') {
    for (
      let x = parsedInstruction.start[0];
      x <= parsedInstruction.end[0];
      x++
    ) {
      for (
        let y = parsedInstruction.start[1];
        y <= parsedInstruction.end[1];
        y++
      ) {
        const coordinateString = x + ',' + y;
        updatedLightStatuses[coordinateString]
          ? updatedLightStatuses[coordinateString]++
          : (updatedLightStatuses[coordinateString] = 1);
      }
    }
  }
  if (parsedInstruction.command === 'turn off') {
    for (
      let x = parsedInstruction.start[0];
      x <= parsedInstruction.end[0];
      x++
    ) {
      for (
        let y = parsedInstruction.start[1];
        y <= parsedInstruction.end[1];
        y++
      ) {
        const coordinateString = x + ',' + y;
        // console.log('Running turn off on', coordinateString);
        // console.log('start value:', updatedLightStatuses[coordinateString]);

        if (updatedLightStatuses[coordinateString] === undefined) {
          continue;
        }
        updatedLightStatuses[coordinateString]--;
        if (updatedLightStatuses[coordinateString] === 0)
          delete updatedLightStatuses[coordinateString];
        // console.log('final value:', updatedLightStatuses[coordinateString]);
      }
    }
  }
  if (parsedInstruction.command === 'toggle') {
    for (
      let x = parsedInstruction.start[0];
      x <= parsedInstruction.end[0];
      x++
    ) {
      for (
        let y = parsedInstruction.start[1];
        y <= parsedInstruction.end[1];
        y++
      ) {
        const coordinateString = x + ',' + y;
        updatedLightStatuses[coordinateString]
          ? (updatedLightStatuses[coordinateString] += 2)
          : (updatedLightStatuses[coordinateString] = 2);
      }
    }
  }
  return updatedLightStatuses;
}

/** TESTS */
console.log('\n\n🧪 Testing executeInstructions');
const testInput1 = [`turn on 0,0 through 1,1`, `toggle 1,1 through 1,1`];
/* Result:
{
  '0,0': 1,
  '0,1': 1,
  '1,0': 1,
  '1,1': 3,
}
*/
const testOutput1 = 6;
test(executeInstructions, [testInput1], testOutput1);

const testInput2 = [`toggle 0,0 through 1,1`, `turn off 0,0 through 1,1`];
/* Result:
{
  '0,0': 1,
  '0,1': 1,
  '1,0': 1,
  '1,1': 1,
}
*/
const testOutput2 = 4;
test(executeInstructions, [testInput2], testOutput2);

console.log('\n\n🧪 Testing parseInstruction');
test(parseInstruction, [`toggle 461,550 through 564,900`], {
  command: 'toggle',
  start: [461, 550],
  end: [564, 900],
});
test(parseInstruction, [`turn off 370,39 through 425,839`], {
  command: 'turn off',
  start: [370, 39],
  end: [425, 839],
});
test(parseInstruction, [`turn on 606,361 through 892,600`], {
  command: 'turn on',
  start: [606, 361],
  end: [892, 600],
});

console.log('\n\n🧪 Testing executeInstruction');
test(
  executeInstruction,
  [{ command: `turn on`, start: [0, 0], end: [1, 1] }, {}],
  { '0,0': 1, '0,1': 1, '1,0': 1, '1,1': 1 }
);
test(
  executeInstruction,
  [
    { command: `turn off`, start: [0, 0], end: [1, 1] },
    { '0,0': 1, '0,1': 2, '1,0': 1, '1,1': 1 },
  ],
  { '0,1': 1 }
);
test(
  executeInstruction,
  [
    { command: `toggle`, start: [0, 0], end: [1, 1] },
    { '0,0': 1, '0,1': 2, '1,0': 1, '1,1': 1 },
  ],
  { '0,0': 3, '0,1': 4, '1,0': 3, '1,1': 3 }
);
