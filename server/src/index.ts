import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import { getAllInvoices } from './data/invoices';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

getAllInvoices().then(console.log);

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
