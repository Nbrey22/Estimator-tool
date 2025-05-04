const express = require('express');
const router = express.Router();
const pool = require('./database');

// GET all saved estimates
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM estimates ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching estimates:', err);
    res.status(500).json({ error: 'Failed to fetch estimates' });
  }
});

// DELETE a specific estimate by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM estimates WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Estimate not found' });
    }

    res.status(200).json({ message: 'Estimate deleted successfully' });
  } catch (err) {
    console.error('Error deleting estimate:', err);
    res.status(500).json({ error: 'Failed to delete estimate' });
  }
});

// POST a new estimate
router.post('/', async (req, res) => {
    const {
      customer,
      materials,
      labor,
      materialMarkupPercentage,
      finalCostsPercentage,
      total
    } = req.body;
  
  //  this log to confirm receipt
  console.log('Received estimate data:', req.body);

    try {
      const result = await pool.query(
        `INSERT INTO estimates (
          customer_name,
          customer_address,
          customer_city_state_zip,
          customer_phone,
          customer_email,
          materials,
          labor,
          material_markup_percentage,
          final_costs_percentage,
          total
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id;`,
        [
          customer.name,
          customer.address,
          customer.cityStateZip,
          customer.phone,
          customer.email,
          JSON.stringify(materials),
          JSON.stringify(labor),
          materialMarkupPercentage,
          finalCostsPercentage,
          total
        ]
      );
  
      res.status(201).json({ message: 'Estimate saved', id: result.rows[0].id });
    } catch (err) {
      console.error('Error saving estimate:', err);
      res.status(500).json({ error: 'Failed to save estimate' });
    }
  });

// GET specific material category (lumber, finishing_materials, hardware, misc_materials)
router.get('/:category', async (req, res) => {
  const { category } = req.params;

  // whitelist allowed categories (tables)
  const allowedCategories = ['lumber', 'finishing_materials', 'hardware', 'misc_materials'];

  if (!allowedCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid material category' });
  }

  const query = `SELECT id, name, unit_price FROM ${category} ORDER BY name`;
  console.log('Executing query:', query); // Log the query

  try {
    const result = await pool.query(`SELECT id, name, unit_price FROM ${category} ORDER BY name`);
    res.json(result.rows);
  } catch (err) {
    console.error(`Error fetching ${category} materials:`, err);
    res.status(500).json({ error: `Failed to fetch ${category} materials` });
  }
});
  
  module.exports = router;