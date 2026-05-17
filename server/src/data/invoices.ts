import fs from 'fs/promises';
import path from 'path';
import {
  Invoice,
  CreateInvoiceDTO,
  UpdateInvoiceDTO,
  InvoiceStatus,
} from '@shared/types/invoice';
import { NotFoundError } from '../middleware/errorHandler';

const DATA_PATH =
  process.env.NODE_ENV === 'test'
    ? path.join(__dirname, './test-data.json')
    : path.join(__dirname, '../data.json');

export async function getAllInvoices(): Promise<Invoice[]> {
  try {
    const response = await fs.readFile(DATA_PATH, 'utf-8');
    const data = JSON.parse(response);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function saveInvoices(invoices: Invoice[]) {
  const jsonString = JSON.stringify(invoices, null, 2);
  await fs.writeFile(DATA_PATH, jsonString, 'utf-8');
}

export async function createInvoice(
  id: Invoice['id'],
  data: CreateInvoiceDTO,
): Promise<Invoice> {
  const invoices = await getAllInvoices();
  const newInvoice = { id, ...data };
  const updatedInvoices = [newInvoice, ...invoices];

  await saveInvoices(updatedInvoices);

  return newInvoice;
}

export async function getInvoice(id: Invoice['id']): Promise<Invoice> {
  const invoices = await getAllInvoices();
  const invoice = invoices.find((invoice: Invoice) => invoice.id === id);

  if (!invoice) {
    throw new NotFoundError('Invoice not found');
  }

  return invoice;
}

export async function updateInvoice(
  id: Invoice['id'],
  data: UpdateInvoiceDTO,
): Promise<Invoice> {
  const invoices = await getAllInvoices();
  const index = invoices.findIndex((invoice: Invoice) => invoice.id === id);

  if (index === -1) {
    throw new NotFoundError('Invoice not found');
  }

  const updatedInvoice = { ...invoices[index], ...data };
  invoices[index] = updatedInvoice;

  await saveInvoices(invoices);

  return updatedInvoice;
}

export async function markInvoicePaid(id: Invoice['id']): Promise<Invoice> {
  const invoices = await getAllInvoices();
  const index = invoices.findIndex((invoice: Invoice) => invoice.id === id);

  if (index === -1) {
    throw new NotFoundError('Invoice not found');
  }

  const updatedInvoice = {
    ...invoices[index],
    status: 'paid' as InvoiceStatus,
  };
  invoices[index] = updatedInvoice;

  await saveInvoices(invoices);

  return updatedInvoice;
}

export async function deleteInvoice(id: Invoice['id']): Promise<void> {
  const invoices = await getAllInvoices();
  const index = invoices.findIndex((invoice: Invoice) => invoice.id === id);

  if (index === -1) {
    throw new NotFoundError('Invoice not found');
  }

  invoices.splice(index, 1);

  await saveInvoices(invoices);
}
