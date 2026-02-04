const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const { claimTicket } = require("../../database/queries/tickets");
const { getServerConfig } = require("../../database/queries/servers");

module.exports = async (interaction) => {
  const config = await getServerConfig(interaction.guild.id);

  // Role check
  if (!interaction.member.roles.cache.has(config.chef_role_id)) {
    return interaction.reply({
      content: "❌ You are not allowed to claim tickets.",
      ephemeral: true
    });
  }

  const ticket = await claimTicket({
    channel_id: interaction.channel.id,
    chef_id: interaction.user.id
  });

  if (!ticket) {
    return interaction.reply({
      content: "❌ This ticket has already been claimed.",
      ephemeral: true
    });
  }

  const embed = new EmbedBuilder()
    .setTitle("✅ Ticket Claimed")
    .setDescription(
      `**Chef:** <@${interaction.user.id}>\n` +
      `This ticket is now locked to you.`
    )
    .setColor(0x2ecc71)
    .setFooter({ text: "Status: CLAIMED" });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("claim_ticket")
      .setLabel("Claimed")
      .setStyle(ButtonStyle.Success)
      .setDisabled(true),
    new ButtonBuilder()
      .setCustomId("close_ticket")
      .setLabel("Close")
      .setStyle(ButtonStyle.Danger)
  );

  await interaction.update({
    embeds: [embed],
    components: [row]
  });
};
