/**
 * TESTS
 */

import { splitTextInputIntoLines, test } from './utils';

const splitTextInputIntoLinesInput = `69214   60950
83241   49638
37930   31308
50722   94914
93164   82798
80918   72850
17490   79421`;

test(
  splitTextInputIntoLines,
  [splitTextInputIntoLinesInput],
  [
    '69214   60950',
    '83241   49638',
    '37930   31308',
    '50722   94914',
    '93164   82798',
    '80918   72850',
    '17490   79421',
  ]
);
