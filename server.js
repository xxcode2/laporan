const express = require('express');
const path = require('path');
const ordersHandler = require('./api/orders');

const app = express();
app.use(express.json());
app.use('/api/orders', ordersHandler);
app.use('/', express.static(path.join(__dirname)));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
