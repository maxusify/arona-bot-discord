const commandResolver = require("../commandResolver");

module.exports = {
  name: "message",
  execute(message, client, cooldowns) {
    if (!message.author.bot)
      console.log(
        `${message.author.tag} w #${message.channel.name} napisał: ${message.content}`
      );

    commandResolver.runCommand(client, message, cooldowns);
  },
};
