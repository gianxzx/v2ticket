const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getDiscount } = require("../../database/queries/discounts");
const { getServerConfig } = require("../../database/queries/servers");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("discount")
    .setDescription("Calculate discounted total for a user")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("User to calculate discount for")
        .setRequired(true)
    )
    .addNumberOption(option =>
      option
        .setName("total")
        .setDescription("Original total amount")
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const guildId = interaction.guild.id;
    const config = await getServerConfig(guildId);

    if (!config) {
      return interaction.editReply("❌ Server is not configured. Run /setup first.");
    }

    const user = interaction.options.getUser("user");
    const total = interaction.options.getNumber("total");

    const discountPercent = await getDiscount(guildId, user.id);
    const discountedTotal = total * (1 - discountPercent / 100);

    const embed = new EmbedBuilder()
      .setTitle("💸 Discount Applied")
      .setDescription(
        `**User:** <@${user.id}>\n` +
        `**Original Total:** $${total.toFixed(2)}\n` +
        `**Discount:** ${discountPercent}%\n` +
        `**Discounted Total:** $${discountedTotal.toFixed(2)}`
      )
      .setColor(0x1abc9c)
      .setFooter({ text: "Discount System" });

    // Send to configured discount channel
    const discountChannel = await interaction.guild.channels.fetch(config.discount_channel_id);
    if (discountChannel) {
      await discountChannel.send({ embeds: [embed] });
    }

    // Ephemeral confirmation
    await interaction.editReply({ content: "✅ Discount applied and posted.", embeds: [embed] });
  }
};
