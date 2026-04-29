import express, { Request, Response } from 'express';
import { getAllInvoices } from '../data/invoices';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const data = await getAllInvoices();
  res.json(data);
});

export default router;
