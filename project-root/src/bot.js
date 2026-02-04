const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection
} = require("discord.js");

const commandHandler = require("./handlers/commandHandler");
const interactionHandler = require("./handlers/interactionHandler");

module.exports = async function startBot() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages
    ],
    partials: [Partials.Channel]
  });

  client.commands = new Collection();

  client.once("ready", () => {
    console.log(`[BOT] Logged in as ${client.user.tag}`);
  });

  commandHandler(client);
  interactionHandler(client);

  await client.login(process.env.DISCORD_TOKEN);
};
