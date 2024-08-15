require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');

const authenticateToken = require('./middleware/authMiddleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Public routes
app.get('/health-check', (req, res) => {
  res.send({ msg: 'Server is Healthy' });
});
app.use('/auth', authRoutes);

// Check for authentication
app.use('/auth/check', authenticateToken);

// Protected routes
app.use('/customers', customerRoutes);
app.use('/medicines', medicineRoutes);
app.use('/purchases', purchaseRoutes);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
