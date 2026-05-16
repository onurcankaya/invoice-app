import { z } from 'zod';

const addressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  postCode: z.string().min(1, 'Post code is required'),
  country: z.string().min(1, 'Country is required'),
});

const itemSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  price: z.number().min(0, 'Price must be 0 or greater'),
});

export const createInvoiceSchema = z.object({
  senderAddress: addressSchema,
  clientName: z.string().min(1, 'Client name is required'),
  clientEmail: z.email('Invalid email'),
  clientAddress: addressSchema,
  createdAt: z.string().min(1, 'Invoice date is required'),
  paymentTerms: z.number().min(1, 'Payment terms is required'),
  description: z.string().min(1, 'Project description is required'),
  items: z.array(itemSchema).min(1, 'At least one item is required'),
});

export const draftInvoiceSchema = z.object({
  senderAddress: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    postCode: z.string().optional(),
    country: z.string().optional(),
  }),
  clientName: z.string().optional(),
  clientEmail: z.string().optional(),
  clientAddress: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    postCode: z.string().optional(),
    country: z.string().optional(),
  }),
  createdAt: z.string().optional(),
  paymentTerms: z.number().optional(),
  description: z.string().optional(),
  items: z.array(
    z.object({
      name: z.string().optional(),
      quantity: z.number().optional(),
      price: z.number().optional(),
    }),
  ),
});

export type CreateInvoiceFormData = z.infer<typeof createInvoiceSchema>;
export type DraftInvoiceFormData = z.infer<typeof draftInvoiceSchema>;
