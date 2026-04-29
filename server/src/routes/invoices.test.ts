import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import request from 'supertest';
import fs from 'fs/promises';
import path from 'path';
import app from '../index';

beforeAll(() => {
  process.env.NODE_ENV = 'test';
});

beforeEach(async () => {
  const testData = [
    {
      id: 'TEST01',
      createdAt: '2021-08-18',
      paymentDue: '2021-08-19',
      description: 'Test Invoice 1',
      paymentTerms: 1,
      clientName: 'Test Client 1',
      clientEmail: 'test@test.com',
      status: 'pending',
      senderAddress: {
        street: 'Test Street',
        city: 'Test City',
        postCode: '12345',
        country: 'Test Country',
      },
      clientAddress: {
        street: 'Client Street',
        city: 'Client City',
        postCode: '54321',
        country: 'Client Country',
      },
      items: [
        {
          name: 'Test Item 1',
          quantity: 1,
          price: 100,
          total: 100,
        },
      ],
      total: 100,
    },
    {
      id: 'TEST02',
      createdAt: '2021-08-18',
      paymentDue: '2021-08-19',
      description: 'Test Invoice 2',
      paymentTerms: 1,
      clientName: 'Test Client 2',
      clientEmail: 'test@test.com',
      status: 'draft',
      senderAddress: {
        street: 'Test Street',
        city: 'Test City',
        postCode: '12345',
        country: 'Test Country',
      },
      clientAddress: {
        street: 'Client Street',
        city: 'Client City',
        postCode: '54321',
        country: 'Client Country',
      },
      items: [
        {
          name: 'Test Item 1',
          quantity: 1,
          price: 100,
          total: 100,
        },
        {
          name: 'Test Item 2',
          quantity: 2,
          price: 200,
          total: 400,
        },
      ],
      total: 500,
    },
    {
      id: 'TEST03',
      createdAt: '2021-08-18',
      paymentDue: '2021-08-19',
      description: 'Test Invoice 3',
      paymentTerms: 1,
      clientName: 'Test Client 3',
      clientEmail: 'test@test.com',
      status: 'paid',
      senderAddress: {
        street: 'Test Street',
        city: 'Test City',
        postCode: '12345',
        country: 'Test Country',
      },
      clientAddress: {
        street: 'Client Street',
        city: 'Client City',
        postCode: '54321',
        country: 'Client Country',
      },
      items: [
        {
          name: 'Test Item 1',
          quantity: 1,
          price: 100,
          total: 100,
        },
      ],
      total: 100,
    },
  ];

  await fs.writeFile(
    path.join(__dirname, '../data/test-data.json'),
    JSON.stringify(testData, null, 2),
  );
});

describe('GET /api/invoices', () => {
  it('should return all invoices', async () => {
    const response = await request(app).get('/api/invoices');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('POST /api/invoices', () => {
  it('should create a new invoice', async () => {
    const newInvoice = {
      createdAt: '2021-08-18',
      paymentDue: '2021-08-19',
      description: 'Software Development',
      paymentTerms: 1,
      clientName: 'Onur Eren',
      clientEmail: 'onur@gmail.com',
      status: 'pending',
      senderAddress: {
        street: '19 Union Terrace',
        city: 'London',
        postCode: 'E1 3EZ',
        country: 'United Kingdom',
      },
      clientAddress: {
        street: '106 Kendell Street',
        city: 'Sharrington',
        postCode: 'NR24 5WQ',
        country: 'United Kingdom',
      },
      items: [
        {
          name: 'App Development',
          quantity: 1,
          price: 1800.9,
          total: 1800.9,
        },
      ],
      total: 1800.9,
    };

    const response = await request(app).post('/api/invoices').send(newInvoice);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});

describe('PATCH /api/invoices/:id', () => {
  it('should update an invoice', async () => {
    const id = 'TEST02';
    const updatedData = {
      createdAt: '2021-08-18',
      paymentDue: '2021-08-19',
      description: 'Test Invoice 2 updated',
      paymentTerms: 1,
      clientName: 'Test Client 2 updated',
      clientEmail: 'test@test.com',
      status: 'draft',
      senderAddress: {
        street: 'Test Street',
        city: 'Test City',
        postCode: '12345',
        country: 'Test Country',
      },
      clientAddress: {
        street: 'Client Street',
        city: 'Client City',
        postCode: '54321',
        country: 'Client Country',
      },
      items: [
        {
          name: 'Test Item 1',
          quantity: 1,
          price: 100,
          total: 100,
        },
        {
          name: 'Test Item 2',
          quantity: 2,
          price: 200,
          total: 400,
        },
      ],
      total: 500,
    };

    const response = await request(app)
      .patch(`/api/invoices/${id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.description).toBe('Test Invoice 2 updated');
    expect(response.body.clientName).toBe('Test Client 2 updated');

    const getResponse = await request(app).get(`/api/invoices/${id}`);
    expect(getResponse.body.description).toBe('Test Invoice 2 updated');
  });
});

describe('PATCH /api/invoices/:id/pay', () => {
  it('should mark invoice paid', async () => {
    const id = 'TEST01';

    const response = await request(app).patch(`/api/invoices/${id}/pay`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('paid');

    const getResponse = await request(app).get(`/api/invoices/${id}`);
    expect(getResponse.body.status).toBe('paid');
  });
});

describe('DELETE /api/invoices/:id', () => {
  it('should delete an invoice', async () => {
    const id = 'TEST01';
    const response = await request(app).delete(`/api/invoices/${id}`);

    expect(response.status).toBe(204);
  });
});

describe('Error handling', () => {
  it('should return 400 when creating invoice with invalid data', async () => {
    const invalidInvoice = {
      description: 'Missing all other fields',
    };

    const response = await request(app)
      .post('/api/invoices')
      .send(invalidInvoice);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation error');
  });

  it('should return 400 when updating invoice with invalid data', async () => {
    const invalidInvoice = {
      description: 'Missing all other fields',
    };

    const response = await request(app)
      .patch('/api/invoices/TEST01')
      .send(invalidInvoice);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation error');
  });

  it('should return 404 when getting non-existing invoice', async () => {
    const response = await request(app).get('/api/invoices/NOTFOUND');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Invoice not found');
  });

  it('should return 404 when updating non-existing invoice', async () => {
    const validData = {
      createdAt: '2021-08-18',
      paymentDue: '2021-08-19',
      description: 'Test',
      paymentTerms: 1,
      clientName: 'Test',
      clientEmail: 'test@test.com',
      status: 'draft',
      senderAddress: {
        street: 'Test',
        city: 'Test',
        postCode: 'Test',
        country: 'Test',
      },
      clientAddress: {
        street: 'Test',
        city: 'Test',
        postCode: 'Test',
        country: 'Test',
      },
      items: [{ name: 'Test', quantity: 1, price: 100, total: 100 }],
      total: 100,
    };
    const response = await request(app)
      .patch('/api/invoices/NOTFOUND')
      .send(validData);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Invoice not found');
  });

  it('should return 404 when marking non-existing invoice paid', async () => {
    const response = await request(app).patch('/api/invoices/NOTFOUND/pay');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Invoice not found');
  });

  it('should return 404 when deleting non-existing invoice', async () => {
    const response = await request(app).delete('/api/invoices/NOTFOUND');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Invoice not found');
  });
});
