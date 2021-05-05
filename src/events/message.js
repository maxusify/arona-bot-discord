const commandResolver = require("../commandResolver");
const fs = require("fs");
const path = require("path");
const dateFormat = require("dateformat");
const colors = require("colors");
const { prefix } = require("../../config.json");

module.exports = {
  name: "message",
  execute(message, client, cooldowns) {
    const date = new Date();

    // Format wiadomości logów do konsoli
    const timeStamp = `[${dateFormat(date, "dd-mm-yyyy HH:MM:ss")}]`.gray;
    const userName = `${message.author.tag}`.bold.cyan;
    const channelName = `#${message.channel.name}`.blue;
    const messageContent = !message.content.startsWith(prefix)
      ? `${message.content}`.white
      : `${message.content}`.green;
    const log = `${timeStamp} ${userName} w ${channelName}: ${messageContent}`;

    // Format wiadomości logów do pliku
    const timeStampStripped = `[${dateFormat(date, "dd-mm-yyyy HH:MM:ss")}]`;
    const userNameStripped = `${message.author.tag}`;
    const channelNameStripped = `#${message.channel.name}`;
    const messageContentStripped = `${message.content}`;
    const strippedLog = `${timeStampStripped} ${userNameStripped} w ${channelNameStripped}: ${messageContentStripped}`;

    // Jeśli autor wiadomości nie jest botem
    if (!message.author.bot) {
      // Dodaj log do konsoli
      console.log(log);

      // Dodaj log do pliku
      const logsPath = path.join(process.cwd(), "logs/logs.txt");
      fs.appendFile(logsPath, strippedLog + "\n", "utf-8", (err) => {
        if (err) return err;
      });
    }

    // Przekaż sterowanie resolverowi
    commandResolver.runCommand(client, message, cooldowns);
  },
};
