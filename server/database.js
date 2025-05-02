const {Client} = require('pg');
require('dotenv').config();

// create a new client instance with values from the .env file
const client = new Client({
  //connectionString: process.env.DB_URL, (not used)
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432, // default to 5432 if not defined in .env
  ssl:{
    rejectUnauthorized: false
  }
});

// connect to the database
client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = client;