const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

module.exports = function ticketEmbed({ customerId, order }) {
  const embed = new EmbedBuilder()
    .setTitle("📦 New Order Ticket")
    .setDescription(
      `**Customer:** <@${customerId}>\n` +
      `**Order:** ${order}`
    )
    .setColor(0x3498db)
    .setFooter({ text: "Ticket Status: OPEN" });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("claim_ticket")
      .setLabel("Claim")
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId("close_ticket")
      .setLabel("Close")
      .setStyle(ButtonStyle.Danger)
  );

  return {
    embeds: [embed],
    components: [row]
  };
};
