const fs = require("fs");

const inputPath = `${__dirname}/p1-input.txt`;
const rules = fs.readFileSync(inputPath, "utf8").split("\n");

const bagContentsRules = translateInputTextToObject(rules);
const allBags = getAllBagsThatContainAColor("shiny gold");
console.log(allBags.length);

function translateInputTextToObject(rules) {
  const bagContents = {};

  for (rule of rules) {
    const [bagColor, contentsObject] = getColorOfContainingBags(rule);
    bagContents[bagColor] = contentsObject;
  }
  return bagContents;

  function getColorOfContainingBags(input) {
    const [bagColor, contentsString] = input.split(" bags contain ");
    const contentsObject = translateContentsStringToObject(contentsString);
    return [bagColor, contentsObject];
  }

  function translateContentsStringToObject(contentsString) {
    const contentsObject = {};
    const bagRegex = /(\d)+ (.*?) bag/g;
    const matches = [...new Set([...contentsString.matchAll(bagRegex)])];
    for (match of matches) {
      const [, count, innerBagColor] = match;
      contentsObject[innerBagColor] = Number(count);
    }
    return contentsObject;
  }
}

function getAllBagsThatContainAColor(colorName) {
  const containerBags = getBagsThatContainAColor(colorName);
  if (containerBags.length === 0) return [];

  let result = [...containerBags];
  for (bag of containerBags) {
    result = [...result, ...getAllBagsThatContainAColor(bag)];
  }
  return [...new Set(result)];
}

function getBagsThatContainAColor(colorName) {
  const results = [];
  const allBagColors = Object.keys(bagContentsRules);
  for (bagColor of allBagColors) {
    if (
      Object.keys(bagContentsRules[bagColor]).some((key) => key === colorName)
    ) {
      results.push(bagColor);
    }
  }
  return results;
}
