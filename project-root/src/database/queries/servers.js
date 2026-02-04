const pool = require("../pool");

async function upsertServerConfig(data) {
  const query = `
    INSERT INTO servers (
      guild_id,
      chef_role_id,
      admin_role_id,
      ticket_category_id,
      transcript_channel_id,
      discount_channel_id
    )
    VALUES ($1,$2,$3,$4,$5,$6)
    ON CONFLICT (guild_id)
    DO UPDATE SET
      chef_role_id = EXCLUDED.chef_role_id,
      admin_role_id = EXCLUDED.admin_role_id,
      ticket_category_id = EXCLUDED.ticket_category_id,
      transcript_channel_id = EXCLUDED.transcript_channel_id,
      discount_channel_id = EXCLUDED.discount_channel_id
  `;
  const values = [
    data.guild_id,
    data.chef_role_id,
    data.admin_role_id,
    data.ticket_category_id,
    data.transcript_channel_id,
    data.discount_channel_id
  ];

  await pool.query(query, values);
}

async function getServerConfig(guild_id) {
  const res = await pool.query(
    `SELECT * FROM servers WHERE guild_id = $1`,
    [guild_id]
  );
  return res.rows[0];
}

module.exports = {
  upsertServerConfig,
  getServerConfig
};
