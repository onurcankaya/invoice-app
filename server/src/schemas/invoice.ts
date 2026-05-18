import { z } from 'zod';

const invoiceStatusSchema = z.enum(['draft', 'pending', 'paid']);

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  postCode: z.string(),
  country: z.string(),
});

const invoiceItemSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
  total: z.number(),
});

const invoiceSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  paymentDue: z.string(),
  description: z.string(),
  clientName: z.string(),
  clientEmail: z.string(),
  status: invoiceStatusSchema,
  senderAddress: addressSchema,
  clientAddress: addressSchema,
  items: z.array(invoiceItemSchema),
  total: z.number(),
});

const draftInvoiceSchema = z.object({
  createdAt: z.string(),
  paymentDue: z.string(),
  description: z.string(),
  clientName: z.string(),
  clientEmail: z.string(),
  status: z.literal('draft'),
  senderAddress: addressSchema,
  clientAddress: addressSchema,
  items: z.array(invoiceItemSchema),
  total: z.number(),
});

const createInvoiceSchema = z.object({
  createdAt: z.string(),
  paymentDue: z.string(),
  description: z.string(),
  clientName: z.string(),
  clientEmail: z.string(),
  status: z.literal('pending'),
  senderAddress: addressSchema,
  clientAddress: addressSchema,
  items: z.array(invoiceItemSchema),
  total: z.number(),
});

const updateInvoiceSchema = z.object({
  createdAt: z.string(),
  paymentDue: z.string(),
  description: z.string(),
  clientName: z.string(),
  clientEmail: z.string(),
  status: z.literal('pending'),
  senderAddress: addressSchema,
  clientAddress: addressSchema,
  items: z.array(invoiceItemSchema),
  total: z.number(),
});

export {
  invoiceStatusSchema,
  addressSchema,
  invoiceItemSchema,
  invoiceSchema,
  draftInvoiceSchema,
  createInvoiceSchema,
  updateInvoiceSchema,
};
