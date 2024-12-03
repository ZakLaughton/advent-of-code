import { getTextInputFromFileInLines, test } from '../../utils';

/** TYPES */
type Command = 'toggle' | 'turn off' | 'turn on';
type Coordinates = [number, number];
interface ParsedInstruction {
  command: Command;
  start: Coordinates;
  end: Coordinates;
}

/** MAIN */
const input = getTextInputFromFileInLines('./input.txt');
console.log('ANSWER>>>', executeInstructions(input));

/** FUNCTIONS */
// Executes a set of instructions for the lights and returns the total number of lights on at the end
function executeInstructions(input: string[]): number {
  let turnedOnLights: Set<string> = new Set();

  for (const instruction of input) {
    const parsedInstruction = parseInstruction(instruction);
    turnedOnLights = executeInstruction(parsedInstruction, turnedOnLights);
  }

  return turnedOnLights.size;
}

// Returns the command, start coordinates, and end coordinates from a given instruction
function parseInstruction(instruction: string): ParsedInstruction {
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
  lightSet: Set<string>
): Set<string> {
  const updatedSet = new Set(lightSet);
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
        updatedSet.add(x + ',' + y);
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
        updatedSet.delete(x + ',' + y);
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
        if (updatedSet.has(coordinateString)) {
          updatedSet.delete(coordinateString);
        } else {
          updatedSet.add(coordinateString);
        }
      }
    }
  }
  return updatedSet;
}

/** TESTS */
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
  [{ command: `turn on`, start: [0, 0], end: [1, 1] }, new Set()],
  new Set(['0,0', '0,1', '1,0', '1,1'])
);
test(
  executeInstruction,
  [
    { command: `turn off`, start: [0, 0], end: [1, 1] },
    new Set(new Set(['0,0', '0,1', '1,0', '1,1'])),
  ],
  new Set()
);
test(
  executeInstruction,
  [{ command: `toggle`, start: [0, 0], end: [1, 1] }, new Set(['0,0', '1,0'])],
  new Set(['0,1', '1,1'])
);
