const pool = require("../database")

/* *****************************
 *   Register new account
 * *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password) {
  try {
    const sql = `
      INSERT INTO account (
        account_firstname, 
        account_lastname, 
        account_email, 
        account_password, 
        account_type
      ) 
      VALUES ($1, $2, $3, $4, 'Client') 
      RETURNING *`
    return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
  } catch (error) {
    return error.message
  }
}

/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email) {
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1"
    const email = await pool.query(sql, [account_email])
    return email.rowCount
  } catch (error) {
    return error.message
  }
}

/* *****************************
 * Return account data using email address
 * ***************************** */
async function getAccountByEmail(account_email) {
  try {
    const result = await pool.query(
      `SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password 
       FROM account 
       WHERE account_email = $1`,
      [account_email]
    )
    return result.rows[0]
  } catch (error) {
    return new Error("No matching email found")
  }
}

/* *****************************
 * Return account data by ID
 * ***************************** */
async function getAccountById(account_id) {
  try {
    const result = await pool.query(
      `SELECT account_id, account_firstname, account_lastname, account_email, account_type 
       FROM account 
       WHERE account_id = $1`,
      [account_id]
    )
    return result.rows[0]
  } catch (error) {
    return new Error("Account not found")
  }
}

/* *****************************
 * Update account information (excluding password)
 * ***************************** */
async function updateAccount(account_id, account_firstname, account_lastname, account_email) {
  try {
    const sql = `
      UPDATE account 
      SET account_firstname = $1, 
          account_lastname = $2, 
          account_email = $3 
      WHERE account_id = $4 
      RETURNING *`
    const data = await pool.query(sql, [
      account_firstname,
      account_lastname,
      account_email,
      account_id
    ])
    return data.rows[0]
  } catch (error) {
    return error.message
  }
}

/* *****************************
 * Update account password
 * ***************************** */
async function updatePassword(account_id, hashedPassword) {
  try {
    const sql = `
      UPDATE account 
      SET account_password = $1 
      WHERE account_id = $2`
    const data = await pool.query(sql, [hashedPassword, account_id])
    return data.rowCount
  } catch (error) {
    return error.message
  }
}

/* ***************************
 * Get account by ID
 * ************************** */
async function getAccountById(account_id) {
  try {
    const result = await pool.query(
      "SELECT account_id, account_firstname, account_lastname, account_email, account_type FROM public.account WHERE account_id = $1",
      [account_id]
    )
    return result.rows[0]
  } catch (error) {
    throw error
  }
}

/* ***************************
 * Update account info
 * ************************** */
async function updateAccountInfo(account_id, firstname, lastname, email) {
  try {
    const result = await pool.query(
      `UPDATE public.account
       SET account_firstname = $1, account_lastname = $2, account_email = $3
       WHERE account_id = $4
       RETURNING *`,
      [firstname, lastname, email, account_id]
    )
    return result.rows[0]
  } catch (error) {
    throw error
  }
}

/* ***************************
 * Update account password
 * ************************** */
async function updateAccountPassword(account_id, hashedPassword) {
  try {
    const result = await pool.query(
      `UPDATE public.account
       SET account_password = $1
       WHERE account_id = $2
       RETURNING *`,
      [hashedPassword, account_id]
    )
    return result.rows[0]
  } catch (error) {
    throw error
  }
}

/* ***************************
 * Get all accounts
 * ************************** */
async function getAllAccounts() {
  try {
    const result = await pool.query(
      `SELECT account_id, account_firstname, account_lastname, account_email, account_type
       FROM public.account
       ORDER BY account_lastname, account_firstname`
    );
    return result.rows;
  } catch (error) {
    console.error("getAllAccounts error:", error);
    throw error;
  }
}

module.exports = {
  getAllAccounts,
  getAccountById,
  updateAccountInfo,
  updateAccountPassword,
  registerAccount,
  checkExistingEmail,
  getAccountByEmail,
  getAccountById,
  updateAccount,
  updatePassword
}
