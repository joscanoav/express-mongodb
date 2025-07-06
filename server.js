const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// conectar a MongoDB
const mongoUri = process.env.MONGO_URI;
mongoose
  .connect(mongoUri)
  .then(() => console.log('✔️ MongoDB connected'))
  .catch(err => console.error('❌ Mongo error', err));

// 👇 ESTA LÍNEA importa tu router
const contactsRouter = require('./routes/contacts');

// 👇 ESTA LÍNEA monta el router en /api/contacts
app.use('/api/contacts', contactsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
