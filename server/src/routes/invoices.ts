import express, { Request, Response } from 'express';
import {
  getAllInvoices,
  createInvoice,
  getInvoice,
  updateInvoice,
} from '../data/invoices';
import { createInvoiceSchema, updateInvoiceSchema } from '../schemas/invoice';
import { generateId } from '../utils/generateId';
import { Invoice } from '../types/invoice';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const data = await getAllInvoices();
  res.json(data);
});

router.post('/', async (req: Request, res: Response) => {
  const id = generateId();
  const validatedData = createInvoiceSchema.parse(req.body);

  const newInvoice = { id, ...validatedData };
  const data = await createInvoice(newInvoice);

  res.status(201).json(data);
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id as Invoice['id'];
  const data = await getInvoice(id);

  res.status(200).json(data);
});

router.patch('/:id', async (req: Request, res: Response) => {
  const id = req.params.id as Invoice['id'];
  const validatedUpdateData = updateInvoiceSchema.parse(req.body);
  const data = await updateInvoice(id, validatedUpdateData);

  res.status(200).json(data);
});

export default router;
