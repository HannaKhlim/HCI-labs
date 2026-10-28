import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { Transform, Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { DATA_DIR } from '../fs/records.js';

export const LARGE_FILE = path.join(DATA_DIR, 'large-products.jsonl');
export const OUTPUT_FILE = path.join(DATA_DIR, 'stream-output.txt');
export const TRANSFORMED_FILE = path.join(DATA_DIR, 'transformed-products.jsonl');

export async function generateLargeFile(count = 150000) {
  if (!Number.isInteger(count) || count < 1 || count > 2000000) throw new Error('Количество должно быть целым числом от 1 до 2 000 000.');
  await fsp.mkdir(DATA_DIR, { recursive: true });
  const output = fs.createWriteStream(LARGE_FILE, { encoding: 'utf8' });
  for (let i = 1; i <= count; i++) {
    const item = { id: `large_${i}`, name: `Товар ${i}`, category: ['Периферия', 'Комплектующие', 'Аксессуары'][i % 3], price: (i % 100000) / 10, stock: i % 250 };
    if (!output.write(JSON.stringify(item) + '\n')) await new Promise((resolve, reject) => { output.once('drain', resolve); output.once('error', reject); });
  }
  await new Promise((resolve, reject) => output.end((error) => error ? reject(error) : resolve()));
  const stat = await fsp.stat(LARGE_FILE);
  return { path: LARGE_FILE, count, bytes: stat.size };
}

export async function readWithReadable(file = LARGE_FILE) {
  let bytes = 0;
  let chunks = 0;
  const readable = fs.createReadStream(file);
  const sink = new Writable({
    write(chunk, encoding, callback) {
      bytes += chunk.length;
      chunks++;
      callback();
    }
  });
  await pipeline(readable, sink);
  return { bytes, chunks };
}

export async function writeWithWritable(content = 'Запись через Writable Stream\n') {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  await pipeline(
    (async function* () { yield content; })(),
    fs.createWriteStream(OUTPUT_FILE, { encoding: 'utf8' })
  );
  return OUTPUT_FILE;
}

export async function transformLargeFile(file = LARGE_FILE) {
  const transform = new Transform({
    writableObjectMode: false,
    transform(chunk, encoding, callback) {
      try {
        const text = chunk.toString('utf8');
        // Потоковые чанки не обязаны совпадать с границами строк — сохраняем хвост.
        const combined = (this.remainder || '') + text;
        const lines = combined.split('\n');
        this.remainder = lines.pop();
        const converted = lines.filter(Boolean).map((line) => {
          const item = JSON.parse(line);
          item.category = item.category.toLocaleUpperCase('ru');
          return JSON.stringify(item);
        }).join('\n');
        callback(null, converted ? converted + '\n' : '');
      } catch (error) {
        callback(error);
      }
    },
    flush(callback) {
      try {
        if (this.remainder?.trim()) {
          const item = JSON.parse(this.remainder);
          item.category = item.category.toLocaleUpperCase('ru');
          this.push(JSON.stringify(item) + '\n');
        }
        callback();
      } catch (error) { callback(error); }
    }
  });
  await pipeline(fs.createReadStream(file, { encoding: 'utf8' }), transform, fs.createWriteStream(TRANSFORMED_FILE, { encoding: 'utf8' }));
  return TRANSFORMED_FILE;
}

export async function benchmarkRead(file = LARGE_FILE) {
  const stat = await fsp.stat(file);
  const beforeFull = process.memoryUsage().rss;
  const startFull = performance.now();
  const buffer = await fsp.readFile(file);
  const fullMs = performance.now() - startFull;
  const fullPeakObserved = process.memoryUsage().rss;
  const bytes = buffer.length;
  // Отпускаем ссылку перед потоковым тестом; GC не вызываем принудительно.
  let release = buffer;
  release = null;

  const beforeStream = process.memoryUsage().rss;
  const startStream = performance.now();
  const result = await readWithReadable(file);
  const streamMs = performance.now() - startStream;
  const streamAfter = process.memoryUsage().rss;
  return {
    file, fileBytes: stat.size, bytesRead: result.bytes, chunks: result.chunks,
    fullReadMs: Number(fullMs.toFixed(2)), streamReadMs: Number(streamMs.toFixed(2)),
    rssBeforeFullMB: Number((beforeFull / 1024 / 1024).toFixed(2)),
    rssAfterFullMB: Number((fullPeakObserved / 1024 / 1024).toFixed(2)),
    rssBeforeStreamMB: Number((beforeStream / 1024 / 1024).toFixed(2)),
    rssAfterStreamMB: Number((streamAfter / 1024 / 1024).toFixed(2)),
    note: 'RSS — снимки памяти процесса, а не гарантированный пик; результаты зависят от ОС, размера файла и прогрева кэша.'
  };
}
