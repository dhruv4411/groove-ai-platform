import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';

import metaRoutes from './routes/meta.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Groove AI Backend Running');
});

app.use('/api/meta', metaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});