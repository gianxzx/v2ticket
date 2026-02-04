const buildPermissions = require("./permissions");
const { getServerConfig } = require("../database/queries/servers");

module.exports = async function createTicketChannel(interaction) {
  const config = await getServerConfig(interaction.guild.id);
  if (!config) throw new Error("Server not configured");

  const channel = await interaction.guild.channels.create({
    name: `ticket-${interaction.user.username}`.toLowerCase(),
    type: 0, // GUILD_TEXT
    parent: config.ticket_category_id,
    permissionOverwrites: buildPermissions({
      guild: interaction.guild,
      customerId: interaction.user.id,
      chefRoleId: config.chef_role_id
    })
  });

  return channel;
};
