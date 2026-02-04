const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

module.exports = function ticketPanelEmbed() {
  const embed = new EmbedBuilder()
    .setTitle("🍽️ Order Ticket")
    .setDescription(
      "Click the button below to place your order.\n" +
      "A private ticket will be created for you."
    )
    .setColor(0x3498db)
    .setFooter({ text: "Ticket System" });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("open_ticket")
      .setLabel("Open Ticket")
      .setStyle(ButtonStyle.Primary)
  );

  return {
    embeds: [embed],
    components: [row]
  };
};
