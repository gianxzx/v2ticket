const express = require("express");
const app = express();

app.get("/", (_, res) => {
  res.send("Bot is alive");
});

module.exports = function startWeb() {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`[WEB] Listening on ${PORT}`)
  );
};
