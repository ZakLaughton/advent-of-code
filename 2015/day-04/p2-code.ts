import { createHash } from 'crypto';
import { test } from '../../utils';

const input = 'yzbqklnj';
console.log('ANSWER>>>', getFirstHashWith6Leading0s(input));

/** FUNCTIONS */
function getFirstHashWith6Leading0s(input: string): number {
  let count = 0;
  while (true) {
    const hash = createMd5Hash(input + count);
    // if (count % 10000 === 0) console.log('count>>>', count);
    if (hasSixLeading0s(hash)) return count;
    count++;
  }
}
function createMd5Hash(input: string): string {
  return createHash('md5').update(input).digest('hex');
}

function hasSixLeading0s(hash: string): boolean {
  return hash.substring(0, 6) === '000000';
}

/** TESTS */

console.log('\n\n🧪 Testing createMd5Hash');
test(createMd5Hash, ['hellothere'], 'c6f7c372641dd25e0fddf0215375561f');

console.log('\n\n🧪 Testing hasFiveLeading0s');
test(hasSixLeading0s, ['000000asdflkj443n*'], true);
test(hasSixLeading0s, ['00000asdflkj443n*'], false);
test(hasSixLeading0s, [`I'm a cucumber`], false);

console.log('\n\n🧪 Testing getFirstHashWith5Leading0s');
// test(getFirstHashWith5Leading0s, ['abcdef'], 609043);
// test(getFirstHashWith5Leading0s, [`pqrstuv`], 1048970);
