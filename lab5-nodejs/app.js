import fs from 'node:fs/promises';
import path from 'node:path';
import { Worker } from 'node:worker_threads';
import { fileURLToPath } from 'node:url';
import {
  createRecord, readRecord, listRecords, updateRecord, deleteRecord,
  renameRecord, searchRecordsInteractive, backupDirectory, DATA_DIR
} from './src/fs/records.js';
import { generateLargeFile, readWithReadable, writeWithWritable, transformLargeFile, benchmarkRead, LARGE_FILE } from './src/streams/stream-ops.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const [command, ...rest] = args;

function help() {
  console.log(`Каталог товаров — лабораторная работа №5 (Node.js)
Команды:
  node app.js create "Название" "Категория" "Цена" "Остаток"
  node app.js read <id>
  node app.js list
  node app.js update <id> <поле> <новое-значение>
  node app.js delete <id>
  node app.js rename <id> <новый-id>
  node app.js search
  node app.js backup [исходный-каталог] [каталог-копии]
  node app.js generate-large [количество]
  node app.js stream-read [файл]
  node app.js stream-write [текст]
  node app.js transform [файл]
  node app.js benchmark [файл]
  node app.js compute <main|worker> [итерации]
  node app.js help`);
}

function requireArgs(values, count, usage) {
  if (values.length < count) throw new Error(`Недостаточно аргументов. Использование: ${usage}`);
}

function print(value) {
  console.log(typeof value === 'string' ? value : JSON.stringify(value, null, 2));
}

function heavyCompute(iterations) {
  let hash = 2166136261;
  for (let i = 0; i < iterations; i++) {
    hash ^= (i + (hash >>> 7));
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash >>> 0;
}

async function compute(mode, iterations) {
  if (!['main', 'worker'].includes(mode)) throw new Error('Режим должен быть main или worker.');
  if (!Number.isInteger(iterations) || iterations < 1 || iterations > 200000000) throw new Error('Итерации должны быть целым числом от 1 до 200 000 000.');
  console.log(`Вычисление ${iterations.toLocaleString('ru')} итераций, режим: ${mode}.`);
  let ticks = 0;
  const timer = setInterval(() => {
    ticks++;
    console.log(`Главный поток отвечает: tick ${ticks}`);
  }, 200);
  const start = performance.now();
  try {
    if (mode === 'main') {
      const result = heavyCompute(iterations);
      console.log(JSON.stringify({ mode, result, elapsedMs: Number((performance.now() - start).toFixed(2)), timerTicks: ticks }, null, 2));
    } else {
      const workerPath = path.join(__dirname, 'src/workers/compute-worker.js');
      const worker = new Worker(workerPath, { workerData: { iterations } });
      const result = await new Promise((resolve, reject) => {
        worker.once('message', resolve);
        worker.once('error', reject);
        worker.once('exit', (code) => { if (code !== 0) reject(new Error(`Worker завершился с кодом ${code}`)); });
      });
      console.log(JSON.stringify({ mode, ...result, elapsedMsTotal: Number((performance.now() - start).toFixed(2)), timerTicks: ticks }, null, 2));
    }
  } finally {
    clearInterval(timer);
  }
}

async function main() {
  try {
    switch (command) {
      case 'help':
      case undefined:
        help();
        break;
      case 'create': {
        requireArgs(rest, 4, 'node app.js create "Название" "Категория" "Цена" "Остаток"');
        const [name, category, priceRaw, stockRaw] = rest;
        const price = Number(priceRaw);
        const stock = Number(stockRaw);
        if (!name.trim() || !category.trim()) throw new Error('Название и категория обязательны.');
        if (!Number.isFinite(price) || price < 0) throw new Error('Цена должна быть неотрицательным числом.');
        if (!Number.isInteger(stock) || stock < 0) throw new Error('Остаток должен быть целым неотрицательным числом.');
        print(await createRecord({ name, category, price, stock }));
        break;
      }
      case 'read':
        requireArgs(rest, 1, 'node app.js read <id>');
        print(await readRecord(rest[0]));
        break;
      case 'list':
        print(await listRecords());
        break;
      case 'update':
        requireArgs(rest, 3, 'node app.js update <id> <name|category|price|stock> <значение>');
        print(await updateRecord(rest[0], rest[1], rest.slice(2).join(' ')));
        break;
      case 'delete':
        requireArgs(rest, 1, 'node app.js delete <id>');
        print(`Удалена запись ${await deleteRecord(rest[0])}`);
        break;
      case 'rename':
        requireArgs(rest, 2, 'node app.js rename <id> <новый-id>');
        print(await renameRecord(rest[0], rest[1]));
        break;
      case 'search':
        print(await searchRecordsInteractive());
        break;
      case 'backup': {
        const source = rest[0] ? path.resolve(rest[0]) : DATA_DIR;
        const destination = rest[1] ? path.resolve(rest[1]) : path.resolve('backup');
        print(`Резервная копия создана: ${await backupDirectory(source, destination)}`);
        break;
      }
      case 'generate-large': {
        const count = rest[0] === undefined ? 150000 : Number(rest[0]);
        print(await generateLargeFile(count));
        break;
      }
      case 'stream-read': {
        const file = rest[0] ? path.resolve(rest[0]) : LARGE_FILE;
        print(await readWithReadable(file));
        break;
      }
      case 'stream-write':
        print(`Данные записаны в ${await writeWithWritable(rest.join(' ') || 'Запись через Writable Stream\n')}`);
        break;
      case 'transform':
        print(`Преобразованный файл: ${await transformLargeFile(rest[0] ? path.resolve(rest[0]) : LARGE_FILE)}`);
        break;
      case 'benchmark':
        print(await benchmarkRead(rest[0] ? path.resolve(rest[0]) : LARGE_FILE));
        break;
      case 'compute': {
        requireArgs(rest, 1, 'node app.js compute <main|worker> [итерации]');
        const iterations = rest[1] === undefined ? 12000000 : Number(rest[1]);
        await compute(rest[0], iterations);
        break;
      }
      default:
        throw new Error(`Неизвестная команда "${command}". Используйте: node app.js help`);
    }
  } catch (error) {
    console.error(`Ошибка: ${error.message}`);
    process.exitCode = 1;
  }
}

main();
