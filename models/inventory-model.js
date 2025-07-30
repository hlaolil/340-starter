// models/inventory-model.js
const pool = require("../database") // Adjust if your connection file differs

async function getInventoryById(inv_id) {
  try {
    const result = await pool.query(
      "SELECT * FROM inventory WHERE inv_id = $1",
      [inv_id]
    )
    return result.rows[0]
  } catch (error) {
    throw new Error("Database query error: " + error.message)
  }
}

module.exports = {
  getInventoryById
}