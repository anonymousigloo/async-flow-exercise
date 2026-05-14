/**
 * ASYNCHRONOUS JAVASCRIPT LEARNING MODULE
 * Complete analysis of synchronous vs asynchronous execution,
 * microtasks vs macrotasks, and event loop behavior.
 */

// ============================================
// STEP 1: SYNCHRONOUS EXECUTION
// ============================================
// Explanation: Code runs line by line. Each statement blocks the next.
// This is the default JavaScript behavior.

console.log("A"); // Executes 1st
console.log("B"); // Executes 2nd
console.log("C"); // Executes 3rd
// PREDICTED OUTPUT: A, B, C
// ACTUAL OUTPUT: A, B, C

console.log("\n--- Step 1 Complete: Sync execution blocks sequentially ---\n");

// ============================================
// STEP 2: setTimeout (MACROTASK)
// ============================================
// Explanation: setTimeout schedules a callback in the macrotask queue.
// Even with 0ms delay, it runs AFTER the current synchronous code finishes.

console.log("Start"); // Executes 1st

setTimeout(() => {
  console.log("Timeout"); // Executes 3rd (after sync code completes)
}, 0);

console.log("End"); // Executes 2nd

// PREDICTED OUTPUT: Start, End, Timeout
// WHY? The callback is moved to macrotask queue, waits for call stack to empty.

console.log("\n--- Step 2 Complete: setTimeout defers execution even with 0ms ---\n");

// ============================================
// STEP 3: PROMISES (MICROTASK)
// ============================================
// Explanation: Promise.then() schedules a microtask.
// Microtasks run BEFORE macrotasks (like setTimeout), but after current sync code.

console.log("Start"); // Executes 1st

Promise.resolve().then(() => {
  console.log("Promise"); // Executes 3rd (microtask)
});

console.log("End"); // Executes 2nd

// PREDICTED OUTPUT: Start, End, Promise
// WHY? Microtask queue is emptied before the event loop picks macrotasks.

console.log("\n--- Step 3 Complete: Promise microtasks run before setTimeout macrotasks ---\n");

// ============================================
// STEP 4: MICROTASK vs MACROTASK COMPARISON
// ============================================
// Explanation: When both exist, microtasks always execute first.

console.log("Start"); // Executes 1st

setTimeout(() => {
  console.log("Timeout"); // Executes 4th (macrotask)
}, 0);

Promise.resolve().then(() => {
  console.log("Promise"); // Executes 3rd (microtask - runs before Timeout)
});

console.log("End"); // Executes 2nd

// PREDICTED OUTPUT: Start, End, Promise, Timeout
// WHY? Event loop priority: Sync code → Microtask queue → Macrotask queue

console.log("\n--- Step 4 Complete: Microtasks have priority over macrotasks ---\n");

// ============================================
// STEP 5: ASYNC/AWAIT FLOW
// ============================================
// Explanation: async functions return a Promise. await pauses function execution
// without blocking the main thread, yielding control to the caller.

async function test() {
  console.log("1"); // Executes 2nd (inside async function, before await)
  await Promise.resolve(); // Pauses here, returns control
  console.log("2"); // Executes 4th (microtask after await resolves)
}

console.log("3"); // Executes 1st
test(); // Executes synchronously until first await, then returns
console.log("4"); // Executes 3rd

// PREDICTED OUTPUT: 3, 1, 4, 2
// WHY: 
// - "3" logs first (sync)
// - test() runs, logs "1", hits await, function suspends
// - Control returns, "4" logs
// - After sync code, microtask from await resolves, test resumes, logs "2"

console.log("\n--- Step 5 Complete: await yields control, then resumes as microtask ---\n");

// ============================================
// STEP 6: ADVANCED FLOW CHALLENGE
// ============================================
// Explanation: Complex interaction of sync, microtask, and macrotask.

console.log("A"); // Executes 1st (sync)

setTimeout(() => {
  console.log("B"); // Executes 4th (macrotask - lowest priority)
}, 0);

Promise.resolve().then(() => {
  console.log("C"); // Executes 3rd (microtask - runs after sync but before macrotasks)
});

console.log("D"); // Executes 2nd (sync)

// PREDICTED OUTPUT: A, D, C, B
// 
// STEP-BY-STEP EVENT LOOP ANALYSIS:
// 1. Sync code: logs "A", schedules setTimeout (macrotask), schedules Promise (microtask), logs "D"
// 2. Sync complete. Call stack empty.
// 3. Check microtask queue: Promise.then runs → logs "C"
// 4. Microtask queue empty. Check macrotask queue: setTimeout runs → logs "B"
// 5. Complete.

console.log("\n--- Step 6 Complete: Order is always Sync → Microtasks → Macrotasks ---\n");

// ============================================
// SUMMARY TABLE FOR QUICK REFERENCE
// ============================================
// | Type        | Queue      | Priority | Example                    |
// |-------------|------------|----------|----------------------------|
// | Synchronous | Call stack | Highest  | console.log(), for loops   |
// | Microtask   | Microtask  | Medium   | Promise.then(), queueMicrotask, await continuation |
// | Macrotask   | Macrotask  | Lowest   | setTimeout, setInterval, I/O |
//
// KEY RULE: The event loop will empty the ENTIRE microtask queue before
// picking the NEXT SINGLE macrotask from the macrotask queue.