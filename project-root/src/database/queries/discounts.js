const pool = require("../pool");

// Get discount for a user
async function getDiscount(guild_id, user_id) {
  const res = await pool.query(
    `SELECT discount_percent FROM discounts
     WHERE guild_id = $1 AND user_id = $2`,
    [guild_id, user_id]
  );
  return res.rows[0]?.discount_percent || 0;
}

// Set or update discount for a user
async function setDiscount(guild_id, user_id, percent) {
  await pool.query(
    `INSERT INTO discounts (guild_id, user_id, discount_percent)
     VALUES ($1, $2, $3)
     ON CONFLICT (guild_id, user_id)
     DO UPDATE SET discount_percent = EXCLUDED.discount_percent`,
    [guild_id, user_id, percent]
  );
}

module.exports = { getDiscount, setDiscount };
