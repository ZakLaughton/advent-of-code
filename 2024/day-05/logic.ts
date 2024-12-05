type Rule = [number, number];
type Update = number[];
type ParsedRulesAndUpdates = {
  rules: Rule[];
  updates: Update[];
};

export function parseRulesAndUpdatesFromInput(
  input: string
): ParsedRulesAndUpdates {
  const [rulesString, updatesString] = input.split('\n\n');

  // TODO: Move to it's own export function like translateRulesToArray is set below
  const updates = updatesString
    .split('\n') // Change to array of update strings
    .map(
      (update) =>
        update
          .split(',') // Change updates strings to array of pages
          .map((page) => Number(page)) // Set pages to number format
    );

  return {
    rules: translateRulesToArray(rulesString),
    updates,
  };
}

export function translateRulesToArray(input: string): Rule[] {
  const rulesArray = input.split('\n');
  const rules2DArray: [number, number][] = rulesArray.map((rule) => {
    const [first, second] = rule.split('|');
    return [Number(first), Number(second)];
  });
  return rules2DArray;
}

// Takes parsed input and returns the total of middle pages from valid lines
export function getValidMiddlePageTotal(
  parsedInput: ParsedRulesAndUpdates
): number {
  const { rules, updates } = parsedInput;
  let count = 0;
  for (const update of updates) {
    if (isUpdateValid(rules, update)) {
      count += getMiddlePageNumber(update);
    }
  }
  return count;
}

export function isUpdateValid(rules: Rule[], update: Update): boolean {
  for (const [index, page] of update.entries()) {
    const pagesAfter = update.slice(index, update.length);
    const firstInvalidPage = getFirstInvalidFollowingPage({
      rules,
      startPage: page,
      pagesAfter,
    });
    if (firstInvalidPage !== null) return false;
  }

  return true;
}

// Checks if pages following a starting page are valid according to rules
// returns first violating page
export function getFirstInvalidFollowingPage({
  rules,
  startPage,
  pagesAfter,
}: {
  rules: Rule[];
  startPage: number;
  pagesAfter: number[];
}): number | null {
  const pagesThatMustComeBefore = rules
    .filter((rule) => rule[1] === startPage)
    .map((rule) => rule[0]);
  for (const page of pagesAfter) {
    if (pagesThatMustComeBefore.includes(page)) {
      //   console.log('Invalid page:', page, pagesAfter);
      return page;
    }
  }

  return null;
}

export function translateStringToArray(input: string): Update {
  return input.split(',').map((num) => Number(num));
}

export function getMiddlePageNumber(pages: number[]): number {
  const middleIndex = Math.floor(pages.length / 2);
  return pages[middleIndex];
}

export function getFixedMiddlePageTotal(
  parsedInput: ParsedRulesAndUpdates
): number {
  const { rules, updates } = parsedInput;
  let count = 0;
  for (const update of updates) {
    if (!isUpdateValid(rules, update)) {
      const fixedUpdate = fixUpdate(update);
      count += getMiddlePageNumber(fixedUpdate);
    }
  }
  return count;
}

// Takes rules and an invalid line and returns an array with pages
// rearranged according to the rules
export function fixUpdate(rules: Rule[], update: Update): Update {
  // Rules: [[47,97], [61,47]]
  // Invalid update: [75,97,47,61,53]
  // tempUpdate = [75,97,47,61,53] (copy to modify)
  // let highestTestedIndex = -1
  // for (let i = 0; i < tempUpdate.length; i++)
  // 1. index 0 > highestTestedIndex
  //   test 75: valid
  //   highestTestedIndex++ (1)
  // 2. index 1 > highestTestedIndex
  //   test 97: invalid, violates rule [47, 97]
  //   move 47 to the current index in tempUpdate: [75, 47, 97, 61, 53]
  //   highestTestedIndex++ (2)
  //   test 47: invalid, violates rule [61,47]
  //   move 61 to the current index in tempUpdate: [75, 61, 47, 97, 53]
  //   highestTestedIndex++ (3)
  //   test 61: valid
  // 3. index 2 <= highestTestedIndex
  //   skip
  // 4. index 3 <= highestTestedIndex
  //   skip
  // 5. index 4 > highestTestedIndex
  //   53: valid
  // 6. index 5: exit loop
  // 7. return tempUpdate

  let fixedUpdate = [...update]; // array copy to iteratively sort
  let highestTestedIndex = -1;

  for (let i = 0; i < fixedUpdate.length; i++) {
    while (i > highestTestedIndex) {
      const startPage = fixedUpdate[i];
      const pagesAfter = fixedUpdate.slice(i, update.length);
      const firstInvalidPage = getFirstInvalidFollowingPage({
        rules,
        startPage,
        pagesAfter,
      });
      // Go to next index if valid
      if (firstInvalidPage === null) {
        highestTestedIndex = i;
        continue;
      }
      // Fix an invalid index
      fixedUpdate = moveElement(
        fixedUpdate,
        fixedUpdate.indexOf(firstInvalidPage),
        i
      );
      continue; // Re-test in the current while loop from the current index
    }
  }
  return fixedUpdate;
}

export function moveElement(
  array: number[],
  fromIndex: number,
  toIndex: number
) {
  const newArray = [...array];
  const element = newArray.splice(fromIndex, 1)[0];
  newArray.splice(toIndex, 0, element);
  return newArray;
}
