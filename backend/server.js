import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { askQuestion } from './controllers/chatController.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting basic protection: max 100 requests per 15 min per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests from this IP, please try again later.' }
});

app.use(cors());
app.use(express.json());
app.use('/api/', limiter);

// Request Timeout Handling Middleware (15 seconds)
app.use((req, res, next) => {
  req.setTimeout(15000, () => {
    let err = new Error('Request Timeout');
    err.status = 408;
    next(err);
  });
  res.setTimeout(15000, () => {
    let err = new Error('Service Unavailable / Timeout');
    err.status = 503;
    next(err);
  });
  next();
});

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

app.get('/api/products', (req, res) => {
  try {
    const data = fs.readFileSync(productDataPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.json(products);
  }
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

// Input validation and route handler
app.post('/api/ask', (req, res) => {
  let { question, lang = 'en' } = req.body;

  // Input validation
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Valid question string is required' });
  }

  // Trim long prompts to prevent huge token usage/abuse
  if (question.length > 500) {
    question = question.substring(0, 500);
  }

  req.body.question = question; // Update the req body with trimmed question
  askQuestion(req, res, products);
});

// Global Error Handler for fallbacks
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);

  // Fallback safe response if model or server fails
  res.status(err.status || 500).json({
    is_compatible: null,
    confidence_score: 0,
    safety_flag: false,
    response_en: "Service temporarily unavailable. Please try again later.",
    response_ar: "الخدمة غير متوفرة مؤقتاً. يرجى المحاولة مرة أخرى لاحقاً.",
    source: "error_fallback"
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
