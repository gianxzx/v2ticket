CREATE TABLE IF NOT EXISTS servers (
  guild_id BIGINT PRIMARY KEY,
  chef_role_id BIGINT NOT NULL,
  admin_role_id BIGINT NOT NULL,
  ticket_category_id BIGINT NOT NULL,
  transcript_channel_id BIGINT NOT NULL,
  discount_channel_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
