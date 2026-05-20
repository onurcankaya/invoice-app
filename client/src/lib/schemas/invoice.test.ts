import { describe, it, expect } from 'vitest';
import { invoiceSchema } from './invoice';

describe('invoiceSchema', () => {
  const validInvoice = {
    senderAddress: {
      street: '123 Test St',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'UK',
    },
    clientName: 'Test Client',
    clientEmail: 'client@test.com',
    clientAddress: {
      street: '456 Client St',
      city: 'Manchester',
      postCode: 'M1 1AA',
      country: 'UK',
    },
    createdAt: '2021-08-18',
    paymentTerms: 30,
    description: 'Software Development',
    items: [
      {
        name: 'App Development',
        quantity: 1,
        price: 1800.9,
      },
    ],
  };

  it('validates complete invoice data', () => {
    const result = invoiceSchema.safeParse(validInvoice);
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const invalidData = { ...validInvoice, clientEmail: 'not-an-email' };
    const result = invoiceSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
  });

  it('rejects missing required fields', () => {
    const invalidData = { ...validInvoice, clientName: '' };
    const result = invoiceSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
  });

  it('rejects negative item quantity', () => {
    const invalidData = {
      ...validInvoice,
      items: [{ name: 'Test', quantity: 0, price: 100 }],
    };
    const result = invoiceSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
  });

  it('rejects negative item price', () => {
    const invalidData = {
      ...validInvoice,
      items: [{ name: 'Test', quantity: 1, price: -100 }],
    };
    const result = invoiceSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
  });

  it('requires at least one item', () => {
    const invalidData = { ...validInvoice, items: [] };
    const result = invoiceSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
  });
});
