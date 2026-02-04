const { createTranscript } = require("discord-html-transcripts");

module.exports = async function generateTranscript(channel) {
  return await createTranscript(channel, {
    limit: -1,
    returnType: "attachment",
    filename: `transcript-${channel.id}.html`
  });
};
