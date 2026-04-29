import fs from 'fs/promises';
import path from 'path';
import { Invoice } from '../types/invoice';

const DATA_PATH = path.join(__dirname, '../data.json');

export async function getAllInvoices(): Promise<Invoice[]> {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function saveInvoices(invoices: Invoice[]) {
  const jsonString = JSON.stringify(invoices, null, 2);
  await fs.writeFile(DATA_PATH, jsonString, 'utf-8');
}
