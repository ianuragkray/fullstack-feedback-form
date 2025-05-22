const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;
const DATA_PATH = './data.json';

app.use(cors());
app.use(bodyParser.json());

// Helper to read data
const readData = () => JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const writeData = (data) => fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

// GET all feedbacks
app.get('/feedbacks', (req, res) => {
  const data = readData();
  res.json(data);
});

// POST a new feedback
app.post('/feedbacks', (req, res) => {
  const data = readData();
  const newItem = { id: Date.now(), ...req.body };
  data.push(newItem);
  writeData(data);
  res.status(201).json(newItem);
});

// PUT (Edit feedback)
app.put('/feedbacks/:id', (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const updated = data.map(item => item.id === id ? { ...item, ...req.body } : item);
  writeData(updated);
  res.json({ message: 'Updated successfully' });
});

// DELETE feedback
app.delete('/feedbacks/:id', (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const filtered = data.filter(item => item.id !== id);
  writeData(filtered);
  res.json({ message: 'Deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
