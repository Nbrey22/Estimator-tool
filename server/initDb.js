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

  // lumber material table
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS lumber (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        unit TEXT NOT NULL,
        unit_price NUMERIC(10, 2) NOT NULL
      );
    `);
    console.log("Lumber table created.");
  } catch (err) {
    console.error("Error creating lumber table:", err);
  }

  // finish materials table
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS finishing_materials (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        unit TEXT NOT NULL,
        unit_price NUMERIC(10, 2) NOT NULL
      );
    `);
    console.log("Finishing materials table created.");
  } catch (err) {
    console.error("Error creating finishing materials table:", err);
  }

  // hardware table
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS hardware (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        unit TEXT NOT NULL,
        unit_price NUMERIC(10, 2) NOT NULL
      );
    `);
    console.log("Hardware table created.");
  } catch (err) {
    console.error("Error creating hardware table:", err);
  }

  // misc table
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS misc_materials (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        unit TEXT NOT NULL,
        unit_price NUMERIC(10, 2) NOT NULL
      );
    `);
    console.log("Misc materials table created.");
  } catch (err) {
    console.error("Error creating misc materials table:", err);
  }
}

// function for inserting values into material tables
async function insertData() {
  try {
     // insert data into lumber table
     await pool.query(`
      INSERT INTO lumber (name, unit, unit_price)
      VALUES
      ('2x4 8''', 'LinearFt', 3.75),
      ('2x4 10''', 'LinearFt', 5.72),
      ('2x4 12''', 'LinearFt', 7.75),
      ('2x4 16''', 'LinearFt', 10.22),
      ('2x6 8''', 'LinearFt', 9.35),
      ('2x6 10''', 'LinearFt', 10.98),
      ('2x6 12''', 'LinearFt', 13.77),
      ('2x6 16''', 'LinearFt', 19.48),
      ('2x8 8''', 'LinearFt', 7.07),
      ('2x8 10''', 'LinearFt', 8.32),
      ('2x8 12''', 'LinearFt', 10.42),
      ('2x8 16''', 'LinearFt', 14.12),
      ('2x10 8''', 'LinearFt', 9.92),
      ('2x10 10''', 'LinearFt', 11.98),
      ('2x10 12''', 'LinearFt', 15.38),
      ('2x10 16''', 'LinearFt', 20.26);
    `);
    console.log("Data inserted into lumber table.");

    // insert data into finishing materials table
    await pool.query(`
      INSERT INTO finishing_materials (name, unit, unit_price)
      VALUES
      ('Paint (gallon)', 'Gallon', 25.98),
      ('Oil Paint (gallon)', 'Gallon', 48.48),
      ('Trim Paint (gallon)', 'Gallon', 54.98),
      ('Primer Paint (gallon)', 'Gallon', 15.48),
      ('1/2" 4''x8'' Drywall', 'SqFt', 16.68),
      ('1/2" 4''x10'' Drywall', 'SqFt', 21.48),
      ('1/2" 4''x12'' Drywall', 'SqFt', 25.38),
      ('5/8" 4''x8'' Drywall', 'SqFt', 17.78),
      ('5/8" 4''x10'' Drywall', 'SqFt', 20.62),
      ('5/8" 4''x12'' Drywall', 'SqFt', 26.00);
    `);
    console.log("Data inserted into finishing materials table.");

    // insert data into hardware table ===
    await pool.query(`
      INSERT INTO hardware (name, unit, unit_price)
      VALUES
      ('Nails (box)', 'Box', 12.38),
      ('Screws (box)', 'Box', 15.98);
    `);
    console.log("Data inserted into hardware table.");

    // insert data into misc materials table
    await pool.query(`
      INSERT INTO misc_materials (name, unit, unit_price)
      VALUES
      ('Concrete', 'CubicFeet', 5.98),
      ('Insulation', 'Roll', 18.57);
    `);
    
  console.log("Data inserted into misc materials table.");
  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {

  // close connection once all tables attempted
  pool.end();
  }
}
// call functions for creation
createTable();
insertData();