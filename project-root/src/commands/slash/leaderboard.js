const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const pool = require("../../database/pool");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Show top chefs and customers by order points"),

  async execute(interaction) {
    await interaction.deferReply(); // Defer in case DB is slow

    const guildId = interaction.guild.id;

    // Fetch top 10 users by points
    const { rows } = await pool.query(
      `SELECT user_id, points
       FROM points
       WHERE guild_id = $1
       ORDER BY points DESC
       LIMIT 10`,
      [guildId]
    );

    // Format leaderboard
    const description =
      rows.length > 0
        ? rows.map((row, i) => `**${i + 1}.** <@${row.user_id}> — ${row.points} points`).join("\n")
        : "No points recorded yet.";

    const embed = new EmbedBuilder()
      .setTitle("🏆 Leaderboard")
      .setDescription(description)
      .setColor(0xf1c40f)
      .setFooter({ text: "Order Points Leaderboard" });

    await interaction.editReply({ embeds: [embed] });
  }
};
