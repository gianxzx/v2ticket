-- Servers
CREATE TABLE IF NOT EXISTS servers (
  guild_id BIGINT PRIMARY KEY,
  chef_role_id BIGINT NOT NULL,
  admin_role_id BIGINT NOT NULL,
  ticket_category_id BIGINT NOT NULL,
  transcript_channel_id BIGINT NOT NULL,
  discount_channel_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tickets
CREATE TABLE IF NOT EXISTS tickets (
  guild_id BIGINT NOT NULL,
  channel_id BIGINT PRIMARY KEY,
  customer_id BIGINT NOT NULL,
  chef_id BIGINT,
  status VARCHAR(20) DEFAULT 'open',
  order_data JSONB,
  claimed_at TIMESTAMP,
  closed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Points
CREATE TABLE IF NOT EXISTS points (
  guild_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  points INT DEFAULT 0,
  PRIMARY KEY (guild_id, user_id)
);

-- Discounts
CREATE TABLE IF NOT EXISTS discounts (
  guild_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  discount_percent INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (guild_id, user_id)
);
