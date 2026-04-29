import express, { Request, Response } from 'express';
import { getAllInvoices, saveInvoices } from '../data/invoices';
import { createInvoiceSchema } from '../schemas/invoice';
import { generateId } from '../utils/generateId';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const data = await getAllInvoices();
  res.json(data);
});

router.post('/', async (req: Request, res: Response) => {
  const validatedData = createInvoiceSchema.parse(req.body);
  const id = generateId();
  const allInvoices = await getAllInvoices();

  const newInvoice = {
    id,
    ...validatedData,
  };

  const invoicesUpdated = [newInvoice, ...allInvoices];

  await saveInvoices(invoicesUpdated);

  res.status(201).json(newInvoice);
});

export default router;
