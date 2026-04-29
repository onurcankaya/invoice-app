import fs from 'fs/promises';
import path from 'path';
import { Invoice } from '../types/invoice';
import { NotFoundError } from '../middleware/errorHandler';

const DATA_PATH = path.join(__dirname, '../data.json');

export async function getAllInvoices(): Promise<Invoice[]> {
  try {
    const response = await fs.readFile(DATA_PATH, 'utf-8');
    const data = JSON.parse(response);
    return data;
  } catch (error) {
    return [];
  }
}

export async function saveInvoices(invoices: Invoice[]) {
  const jsonString = JSON.stringify(invoices, null, 2);
  await fs.writeFile(DATA_PATH, jsonString, 'utf-8');
}

export async function getInvoice(id: Invoice['id']): Promise<Invoice> {
  const invoices = await getAllInvoices();
  const invoice = invoices.find((invoice: Invoice) => invoice.id === id);

  if (!invoice) {
    throw new NotFoundError('Invoice not found');
  }

  return invoice;
}
