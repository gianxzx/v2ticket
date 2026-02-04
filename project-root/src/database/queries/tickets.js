const pool = require("../pool");

async function createTicket({
  guild_id,
  channel_id,
  customer_id,
  order_data
}) {
  const res = await pool.query(
    `INSERT INTO tickets (
      guild_id,
      channel_id,
      customer_id,
      status,
      order_data
    )
    VALUES ($1,$2,$3,'open',$4)
    RETURNING *`,
    [guild_id, channel_id, customer_id, order_data]
  );

  return res.rows[0];
}

async function getTicketByChannel(channel_id) {
  const res = await pool.query(
    `SELECT * FROM tickets WHERE channel_id = $1`,
    [channel_id]
  );
  return res.rows[0];
}

module.exports = {
  createTicket,
  getTicketByChannel
};
