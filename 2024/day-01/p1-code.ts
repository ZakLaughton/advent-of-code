import { test } from "../../utils";

function add(a: number, b: number): number {
    return a + b;
}

test(add, [1, 2], 3);