const { EmbedBuilder } = require("discord.js");

const { closeTicket } = require("../../database/queries/tickets");
const { addPoint } = require("../../database/queries/points");
const { getServerConfig } = require("../../database/queries/servers");
const generateTranscript = require("../../tickets/transcript");

module.exports = async (interaction) => {
  const ticket = await closeTicket(interaction.channel.id);

  if (!ticket) {
    return interaction.reply({
      content: "❌ Ticket must be claimed before closing.",
      ephemeral: true
    });
  }

  const config = await getServerConfig(interaction.guild.id);

  // Award points
  await addPoint(ticket.guild_id, ticket.customer_id);
  await addPoint(ticket.guild_id, ticket.chef_id);

  // Transcript
  const transcript = await generateTranscript(interaction.channel);

  // Send transcript to log channel
  const logChannel = await interaction.guild.channels.fetch(
    config.transcript_channel_id
  );

  await logChannel.send({
    content: `📄 Transcript for ticket ${interaction.channel.name}`,
    files: [transcript]
  });

  // DM customer
  try {
    const user = await interaction.client.users.fetch(ticket.customer_id);
    await user.send({
      embeds: [
        new EmbedBuilder()
          .setTitle("🧾 Your Order Transcript")
          .setDescription("Thank you for your order!")
          .setColor(0x9b59b6)
      ],
      files: [transcript]
    });
  } catch {
    // DM closed — ignore
  }

  await interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle("🔒 Ticket Closed")
        .setDescription("Points awarded. Channel will be deleted.")
        .setColor(0xe74c3c)
    ]
  });

  setTimeout(() => interaction.channel.delete(), 5000);
};
