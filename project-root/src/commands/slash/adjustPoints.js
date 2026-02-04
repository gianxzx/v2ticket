const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const pool = require("../../database/pool");
const { getServerConfig } = require("../../database/queries/servers");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("adjust-points")
    .setDescription("Manually adjust points for a user")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("User to adjust points for")
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName("points")
        .setDescription("Points to add or subtract (use negative to remove)")
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const guildId = interaction.guild.id;
    const config = await getServerConfig(guildId);

    if (!config) {
      return interaction.editReply("❌ Server is not configured. Run /setup first.");
    }

    // Check admin role
    if (!interaction.member.roles.cache.has(config.admin_role_id)) {
      return interaction.editReply("❌ You do not have permission to adjust points.");
    }

    const user = interaction.options.getUser("user");
    const points = interaction.options.getInteger("points");

    // Upsert points in DB
    await pool.query(
      `INSERT INTO points (guild_id, user_id, points)
       VALUES ($1, $2, $3)
       ON CONFLICT (guild_id, user_id)
       DO UPDATE SET points = points.points + EXCLUDED.points`,
      [guildId, user.id, points]
    );

    const embed = new EmbedBuilder()
      .setTitle("⚡ Points Adjusted")
      .setDescription(`<@${user.id}> had their points changed by **${points}**.`)
      .setColor(points >= 0 ? 0x2ecc71 : 0xe74c3c)
      .setFooter({ text: `Adjusted by ${interaction.user.tag}` });

    await interaction.editReply({ embeds: [embed] });
  }
};
