const pool = require("../database")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

/* ***************************
 *  Get specific inventory item by inv_id
 * ************************** */
async function getVehicleById(inventoryId) {
  try {
    const data = await pool.query(
      `SELECT 
         inv_id,
         inv_make,
         inv_model,
         inv_year,
         inv_price,
         inv_miles,
         inv_description,
         inv_image,
         inv_color,
       FROM public.inventory,
       WHERE inv_id = $1`,
      [inventoryId]
    );
    return data.rows[0] || null;
  } catch (error) {
    console.error("getVehicleById error: " + error);
    return null;
  }
}

module.exports = { getClassifications, getInventoryByClassificationId, getVehicleById };
