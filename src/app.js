require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Public routes
app.get('/health-check', (req, res) => {
  res.send({ msg: 'Server is Healthy' });
});

// Protected routes

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
