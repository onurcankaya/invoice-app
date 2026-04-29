import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import invoiceRoutes from './routes/invoices';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/invoices', invoiceRoutes);
app.use(errorHandler);

export default app;

if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
