const { Pool } = require('pg');
const pool = require('./database');

async function createTable() {
  try {
    // create table for estimates
    await pool.query(`
      CREATE TABLE IF NOT EXISTS estimates (
        id SERIAL PRIMARY KEY,
        customer_name TEXT NOT NULL,
        customer_address TEXT NOT NULL,
        customer_city_state_zip TEXT NOT NULL,
        customer_phone TEXT,
        customer_email TEXT,
        materials JSONB,
        labor JSONB,
        material_markup_percentage NUMERIC,
        final_costs_percentage NUMERIC,
        total NUMERIC,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Estimates table with JSON fields created successfully.");
  } catch (err) {
    console.error("Error creating estimates table:", err);
  }

}
// call functions for creation
createTable();
