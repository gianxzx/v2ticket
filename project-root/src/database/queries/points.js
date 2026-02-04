const pool = require("../pool");

async function addPoint(guild_id, user_id) {
  await pool.query(
    `INSERT INTO points (guild_id, user_id, points)
     VALUES ($1,$2,1)
     ON CONFLICT (guild_id, user_id)
     DO UPDATE SET points = points.points + 1`,
    [guild_id, user_id]
  );
}

module.exports = { addPoint };
