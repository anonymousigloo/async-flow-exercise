// Step 1: Synchronous Execution
// Subtask 1.1: Basic Sync Code
console.log("A");
console.log("B");
console.log("C");
// Output: A B C

console.log("\n---\n");

// Step 2: setTimeout (Macrotask)
// Subtask 2.1: Basic setTimeout Example
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

console.log("End");
// Output: Start, End, Timeout

console.log("\n---\n");

// Step 3: Promises (Microtask)
// Subtask 3.1: Basic Promise Example
console.log("Start");

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
// Output: Start, End, Promise

console.log("\n---\n");

// Step 4: Microtask vs Macrotask Comparison
// Subtask 4.1: Combine Promise & setTimeout
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
// Output: Start, End, Promise, Timeout

console.log("\n---\n");

// Step 5: Async/Await Flow
// Subtask 5.1: Create Async Function
async function test() {
  console.log("1");
  await Promise.resolve();
  console.log("2");
}

console.log("3");
test();
console.log("4");
// Output: 3, 1, 4, 2

console.log("\n---\n");

// Step 6: Advanced Flow Challenge
// Subtask 6.1: Predict the Output
console.log("A");
setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});
console.log("D");
// Output: A, D, C, B