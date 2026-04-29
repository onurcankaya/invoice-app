import fs from 'fs/promises';
import path from 'path';
import {
  Invoice,
  CreateInvoiceDTO,
  UpdateInvoiceDTO,
  InvoiceStatus,
} from '../types/invoice';
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

export async function createInvoice(
  invoice: CreateInvoiceDTO,
): Promise<Invoice> {
  const invoices = await getAllInvoices();
  const updatedInvoices = [invoice, ...invoices];

  await saveInvoices(updatedInvoices);

  return invoice;
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
