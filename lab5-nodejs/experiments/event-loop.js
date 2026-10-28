console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');

// Прогноз: A, D, C, B.
// Синхронные console.log выполняются сразу; Promise.then — в очереди микрозадач,
// а callback setTimeout — позже, на одной из итераций Event Loop.
