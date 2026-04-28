import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { askQuestion } from './controllers/chatController.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load product data
const productDataPath = path.join(__dirname, '../data/product_catalog.json');
let products = [];
try {
  const data = fs.readFileSync(productDataPath, 'utf8');
  products = JSON.parse(data);
} catch (error) {
  console.error('Error loading product data:', error);
}

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/product', (req, res) => {
  if (products.length > 0) {
    res.json(products[0]);
  } else {
    res.status(404).json({ error: 'No products found' });
  }
});

app.get('/api/product/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.post('/api/ask', (req, res) => askQuestion(req, res, products));

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
