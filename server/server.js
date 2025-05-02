const express = require('express');
const app = express();
const cors = require('cors');
const pool  = require('./database'); // import database connection
require('dotenv').config(); // load environment variables
const estimateRoutes = require('./routes'); // import routes file

const port = 3001;

app.use(cors());
app.use(express.json()); // used for JSON in requests

// api connection for estimates
app.use('/api/estimates', estimateRoutes);

// start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

