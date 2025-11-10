import { inspect } from "util";

console.log(`--- Starting minimal inspect test ---`);

// Создаем простой массив из 100 элементов
const testArray = Array.from({ length: 100 }, (_, i) => ({ index: i + 1 }));

console.log("\n1. Default console.log (should be truncated):");
console.log(testArray);

console.log("\n2. inspect with maxArrayLength: null (should be COMPLETE):");
console.log(inspect(testArray, { maxArrayLength: null }));

console.log(`\n--- Test finished ---`);
