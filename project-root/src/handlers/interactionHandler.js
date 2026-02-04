const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const buttonsPath = path.join(__dirname, "..", "interactions", "buttons");
  const modalsPath = path.join(__dirname, "..", "interactions", "modals");

  const buttonFiles = fs.readdirSync(buttonsPath).filter(f => f.endsWith(".js"));
  const modalFiles = fs.readdirSync(modalsPath).filter(f => f.endsWith(".js"));

  const buttons = {};
  const modals = {};

  // Load buttons
  for (const file of buttonFiles) {
    const b = require(path.join(buttonsPath, file));
    const id = file.replace(".js", "");
    buttons[id] = b;
  }

  // Load modals
  for (const file of modalFiles) {
    const m = require(path.join(modalsPath, file));
    const id = file.replace(".js", "");
    modals[id] = m;
  }

  client.on("interactionCreate", async (interaction) => {
    try {
      if (interaction.isButton()) {
        const handler = buttons[interaction.customId];
        if (handler) await handler(interaction);
      } else if (interaction.isModalSubmit()) {
        const handler = modals[interaction.customId];
        if (handler) await handler(interaction);
      }
    } catch (error) {
      console.error(error);
      if (!interaction.replied) {
        await interaction.reply({ content: "❌ Interaction failed.", ephemeral: true });
      } else {
        await interaction.editReply({ content: "❌ Interaction failed." });
      }
    }
  });
};
