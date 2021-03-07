module.exports = {
  name: "play",
  aliases: ["p", "pl"],
  description: "Odtwarzaj muzykę z YouTube",
  usage: "<url> | <search term>",
  args: true,
  guildOnly: true,
  cooldown: 5,
  execute(message, args) {
    message.reply("działa 😎👍");
  },
};
