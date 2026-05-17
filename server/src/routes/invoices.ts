import express, { Request, Response } from 'express';
import {
  getAllInvoices,
  createInvoice,
  getInvoice,
  updateInvoice,
  markInvoicePaid,
  deleteInvoice,
} from '../data/invoices';
import {
  draftInvoiceSchema,
  createInvoiceSchema,
  updateInvoiceSchema,
} from '../schemas/invoice';
import { generateId } from '../utils/generateId';
import { Invoice } from '@shared/types/invoice';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const data = await getAllInvoices();
  res.json(data);
});

router.post('/', async (req: Request, res: Response) => {
  const id = generateId();

  const validatedData =
    req.body.status === 'draft'
      ? draftInvoiceSchema.parse(req.body)
      : createInvoiceSchema.parse(req.body);

  const data = await createInvoice(id, validatedData);

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

router.patch('/:id/pay', async (req: Request, res: Response) => {
  const id = req.params.id as Invoice['id'];
  const data = await markInvoicePaid(id);

  res.status(200).json(data);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id as Invoice['id'];
  await deleteInvoice(id);

  res.status(204).json();
});

export default router;
