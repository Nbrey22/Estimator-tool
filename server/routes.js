const express = require('express');
const router = express.Router();
const pool = require('./database');

// save a new estimate
router.post('/', async (req, res) => {
    const {
      customer,
      materials,
      labor,
      materialMarkupPercentage,
      finalCostsPercentage,
      total
    } = req.body;
  
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
  
  module.exports = router;