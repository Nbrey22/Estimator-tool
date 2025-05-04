const pool = require('./database'); 

async function displayAllData() {
    try {
      // retrieve and display all data from lumber table
      const lumberData = await pool.query('SELECT * FROM lumber');
      console.log("Lumber Table Data:", lumberData.rows);
  
      // retrieve and display all data from finishing materials table
      const finishingMaterialsData = await pool.query('SELECT * FROM finishing_materials');
      console.log("Finishing Materials Table Data:", finishingMaterialsData.rows);
  
      // retrieve and display all data from hardware table
      const hardwareData = await pool.query('SELECT * FROM hardware');
      console.log("Hardware Table Data:", hardwareData.rows);
  
      // retrieve and display all data from misc materials table
      const miscMaterialsData = await pool.query('SELECT * FROM misc_materials');
      console.log("Misc Materials Table Data:", miscMaterialsData.rows);
  
    } catch (err) {
      console.error("Error displaying data:", err);
    } finally {
      // close the connection
      pool.end();
    }
  }
  
  // call function to display all data
  displayAllData();