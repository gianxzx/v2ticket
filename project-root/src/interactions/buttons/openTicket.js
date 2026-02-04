const {
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle
} = require("discord.js");

module.exports = async (interaction) => {
  const modal = new ModalBuilder()
    .setCustomId("order_modal")
    .setTitle("Order Details");

  const item = new TextInputBuilder()
    .setCustomId("order_item")
    .setLabel("What would you like to order?")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  modal.addComponents(
    new ActionRowBuilder().addComponents(item)
  );

  await interaction.showModal(modal);
};
