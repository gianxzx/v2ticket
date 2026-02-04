const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const ticketPanelEmbed = require("../../embeds/ticket");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("panel")
    .setDescription("Send the ticket creation panel")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.channel.send(ticketPanelEmbed());

    await interaction.reply({
      content: "✅ Ticket panel sent.",
      ephemeral: true
    });
  }
};
