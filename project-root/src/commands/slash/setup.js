const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { upsertServerConfig } = require("../../database/queries/servers");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Configure the ticket system for this server")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addRoleOption(o =>
      o.setName("chef_role")
       .setDescription("Role that can claim tickets")
       .setRequired(true)
    )
    .addRoleOption(o =>
      o.setName("admin_role")
       .setDescription("Admin role for adjustments")
       .setRequired(true)
    )
    .addChannelOption(o =>
      o.setName("ticket_category")
       .setDescription("Category for ticket channels")
       .setRequired(true)
    )
    .addChannelOption(o =>
      o.setName("transcript_channel")
       .setDescription("Where transcripts are sent")
       .setRequired(true)
    )
    .addChannelOption(o =>
      o.setName("discount_channel")
       .setDescription("Where discount embeds are sent")
       .setRequired(true)
    ),

  async execute(interaction) {
    await upsertServerConfig({
      guild_id: interaction.guild.id,
      chef_role_id: interaction.options.getRole("chef_role").id,
      admin_role_id: interaction.options.getRole("admin_role").id,
      ticket_category_id: interaction.options.getChannel("ticket_category").id,
      transcript_channel_id: interaction.options.getChannel("transcript_channel").id,
      discount_channel_id: interaction.options.getChannel("discount_channel").id
    });

    await interaction.reply({
      content: "✅ Ticket system configured successfully.",
      ephemeral: true
    });
  }
};
