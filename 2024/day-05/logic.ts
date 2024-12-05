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
export function getMiddlePageTotal(parsedInput: ParsedRulesAndUpdates): number {
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
  // for each
  for (const [index, page] of update.entries()) {
    const pagesAfter = update.slice(index, update.length);
    const areAllPagesAfterValid = isPageValid({
      rules,
      startPage: page,
      pagesAfter,
    });
    if (!areAllPagesAfterValid) return false;
  }

  return true;
}

// Checks if all pages following a starting page are valid according to rules
export function isPageValid({
  rules,
  startPage,
  pagesAfter,
}: {
  rules: Rule[];
  startPage: number;
  pagesAfter: number[];
}): boolean {
  const pagesThatMustComeBefore = rules
    .filter((rule) => rule[1] === startPage)
    .map((rule) => rule[0]);
  for (const page of pagesAfter) {
    if (pagesThatMustComeBefore.includes(page)) {
      //   console.log('Invalid page:', page, pagesAfter);
      return false;
    }
  }

  return true;
}

export function translateStringToArray(input: string): Update {
  return input.split(',').map((num) => Number(num));
}

export function getMiddlePageNumber(pages: number[]): number {
  const middleIndex = Math.floor(pages.length / 2);
  return pages[middleIndex];
}
