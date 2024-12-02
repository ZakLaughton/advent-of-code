export function test<T>(func: (...args: any[]) => T, input: any[], expected: T) {
    const result = func(...input); // Spread input in case it's an array of arguments
    if (JSON.stringify(result) === JSON.stringify(expected)) {
        console.log(`✅ Test passed. Input: ${JSON.stringify(input)}, Output: ${JSON.stringify(result)}`);
    } else {
        console.error(`❌ Test failed. Input: ${JSON.stringify(input)}, Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(result)}`);
    }
}