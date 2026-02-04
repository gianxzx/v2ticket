require("dotenv").config();

const startWeb = require("./web/server");
const startBot = require("./bot");

startWeb();
startBot();
