CREATE TABLE IF NOT EXISTS discounts (
  guild_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  discount_percent INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (guild_id, user_id)
);
