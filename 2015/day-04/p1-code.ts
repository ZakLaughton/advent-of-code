import { createHash } from 'crypto';
import { test } from '../../utils';

function createMd5Hash(input: string): string {
  return createHash('md5').update(input).digest('hex');
}

test(createMd5Hash, ['hellothere'], 'c6f7c372641dd25e0fddf0215375561f');
