import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const DATA_DIR = path.resolve(here, '../../data');
export const INDEX_PATH = path.join(DATA_DIR, 'index.json');
export const RECORDS_DIR = path.join(DATA_DIR, 'records');

async function ensureStorage() {
  await fs.mkdir(RECORDS_DIR, { recursive: true });
  try {
    await fs.access(INDEX_PATH);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    await fs.writeFile(INDEX_PATH, '[]\n', 'utf8');
  }
}

async function readIndex() {
  await ensureStorage();
  let raw;
  try {
    raw = await fs.readFile(INDEX_PATH, 'utf8');
  } catch (error) {
    throw new Error(`Не удалось прочитать индекс: ${error.message}`);
  }
  try {
    const index = JSON.parse(raw);
    if (!Array.isArray(index)) throw new Error('Индекс должен быть JSON-массивом');
    return index;
  } catch (error) {
    throw new Error(`Индекс повреждён или содержит некорректный JSON: ${error.message}`);
  }
}

async function writeIndex(index) {
  const temp = `${INDEX_PATH}.tmp`;
  await fs.writeFile(temp, JSON.stringify(index, null, 2) + '\n', 'utf8');
  await fs.rename(temp, INDEX_PATH);
}

function recordPath(id) {
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
    throw new Error('ID может содержать только латинские буквы, цифры, "_" и "-".');
  }
  return path.join(RECORDS_DIR, `${id}.json`);
}

function publicRecord(record) {
  const { id, name, category, price, stock, createdAt, updatedAt } = record;
  return { id, name, category, price, stock, createdAt, updatedAt };
}

export async function createRecord({ name, category, price, stock }) {
  await ensureStorage();
  const index = await readIndex();
  const id = `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const file = recordPath(id);
  if (index.some((item) => item.id === id)) throw new Error(`Запись с ID "${id}" уже существует.`);
  try {
    await fs.access(file);
    throw new Error(`Файл ${path.basename(file)} уже существует.`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const now = new Date().toISOString();
  const record = { id, name: name.trim(), category: category.trim(), price, stock, createdAt: now, updatedAt: now };
  await fs.writeFile(file, JSON.stringify(record, null, 2) + '\n', { encoding: 'utf8', flag: 'wx' });
  index.push(publicRecord(record));
  await writeIndex(index);
  return record;
}

export async function readRecord(id) {
  const index = await readIndex();
  if (!index.some((item) => item.id === id)) throw new Error(`Запись с ID "${id}" не найдена.`);
  let raw;
  try {
    raw = await fs.readFile(recordPath(id), 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') throw new Error(`Файл записи "${id}" не найден.`);
    throw new Error(`Не удалось прочитать запись: ${error.message}`);
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`Файл записи "${id}" содержит некорректный JSON: ${error.message}`);
  }
}

export async function listRecords() {
  return readIndex();
}

export async function updateRecord(id, field, rawValue) {
  const allowed = new Set(['name', 'category', 'price', 'stock']);
  if (!allowed.has(field)) throw new Error('Поле для изменения: name, category, price или stock.');
  const record = await readRecord(id);
  let value = rawValue;
  if (field === 'price' || field === 'stock') {
    value = Number(rawValue);
    if (!Number.isFinite(value) || value < 0) throw new Error('Цена и остаток должны быть неотрицательными числами.');
    if (field === 'stock' && !Number.isInteger(value)) throw new Error('Остаток должен быть целым числом.');
  } else {
    value = String(rawValue).trim();
    if (!value) throw new Error('Текстовое поле не может быть пустым.');
  }
  record[field] = value;
  record.updatedAt = new Date().toISOString();
  await fs.writeFile(recordPath(id), JSON.stringify(record, null, 2) + '\n', 'utf8');
  const index = await readIndex();
  const position = index.findIndex((item) => item.id === id);
  if (position === -1) throw new Error(`Запись "${id}" отсутствует в индексе.`);
  index[position] = publicRecord(record);
  await writeIndex(index);
  return record;
}

export async function deleteRecord(id) {
  const index = await readIndex();
  const position = index.findIndex((item) => item.id === id);
  if (position === -1) throw new Error(`Запись с ID "${id}" не найдена.`);
  try {
    await fs.unlink(recordPath(id));
  } catch (error) {
    if (error.code === 'ENOENT') throw new Error(`Файл записи "${id}" не найден; индекс не изменён.`);
    throw error;
  }
  index.splice(position, 1);
  await writeIndex(index);
  return id;
}

export async function renameRecord(id, newId) {
  if (!/^[a-zA-Z0-9_-]+$/.test(newId)) throw new Error('Новый ID может содержать только латинские буквы, цифры, "_" и "-".');
  if (id === newId) throw new Error('Старый и новый ID совпадают.');
  const index = await readIndex();
  const position = index.findIndex((item) => item.id === id);
  if (position === -1) throw new Error(`Запись с ID "${id}" не найдена.`);
  if (index.some((item) => item.id === newId)) throw new Error(`ID "${newId}" уже существует.`);
  const oldPath = recordPath(id);
  const newPath = recordPath(newId);
  try {
    await fs.access(newPath);
    throw new Error(`Целевой файл "${newId}.json" уже существует.`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const record = await readRecord(id);
  await fs.rename(oldPath, newPath);
  record.id = newId;
  record.updatedAt = new Date().toISOString();
  await fs.writeFile(newPath, JSON.stringify(record, null, 2) + '\n', 'utf8');
  index[position] = publicRecord(record);
  await writeIndex(index);
  return record;
}

export async function searchRecordsInteractive() {
  const { createInterface } = await import('node:readline/promises');
  const { stdin, stdout } = await import('node:process');
  const rl = createInterface({ input: stdin, output: stdout });
  try {
    const term = (await rl.question('Поиск по названию/категории (пусто — показать все): ')).trim().toLocaleLowerCase('ru');
    const index = await readIndex();
    return index.filter((item) => `${item.name} ${item.category}`.toLocaleLowerCase('ru').includes(term));
  } finally {
    rl.close();
  }
}

export async function backupDirectory(source = DATA_DIR, destination = path.resolve('backup')) {
  const from = path.resolve(source);
  const to = path.resolve(destination);
  if (from === to || to.startsWith(from + path.sep)) {
    throw new Error('Каталог резервной копии не должен находиться внутри исходного каталога.');
  }
  await fs.access(from);
  await fs.mkdir(path.dirname(to), { recursive: true });
  await fs.cp(from, to, { recursive: true, errorOnExist: false, force: true });
  return to;
}
