const createTicketChannel = require("../../tickets/createChannel");
const { createTicket } = require("../../database/queries/tickets");
const ticketEmbed = require("../../embeds/ticket");

module.exports = async (interaction) => {
  const order = interaction.fields.getTextInputValue("order_item");

  await interaction.deferReply({ ephemeral: true });

  const channel = await createTicketChannel(interaction);

  await createTicket({
    guild_id: interaction.guild.id,
    channel_id: channel.id,
    customer_id: interaction.user.id,
    order_data: { order }
  });

  await channel.send(
    ticketEmbed({
      customerId: interaction.user.id,
      order
    })
  );

  await interaction.editReply({
    content: `✅ Your ticket has been created: ${channel}`
  });
};
