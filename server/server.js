import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8081;

// Раздаём статику
app.use('/src', express.static(path.join(__dirname, '../src')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use('/images', express.static(path.join(__dirname, '../public/images')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000', 'http://89.208.208.203:8081'],
  methods: ['GET','POST','DELETE','PUT'],
  credentials: true
}));

// SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});