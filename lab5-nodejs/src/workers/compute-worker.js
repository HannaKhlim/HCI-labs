import { parentPort, workerData } from 'node:worker_threads';

function heavyCompute(iterations) {
  let hash = 2166136261;
  for (let i = 0; i < iterations; i++) {
    hash ^= (i + (hash >>> 7));
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash >>> 0;
}

const start = performance.now();
const result = heavyCompute(workerData.iterations);
parentPort.postMessage({ result, elapsedMs: Number((performance.now() - start).toFixed(2)) });
