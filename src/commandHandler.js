const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  registerCommands(client) {
    // Utworzenie kolekcji komend
    client.commands = new Discord.Collection();

    // Wczytanie głównego katalogu komend
    const commandFolders = fs.readdirSync(path.resolve(__dirname, "commands"));

    // Wczytanie komend po kategoriach do kolekcji komend
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(path.resolve(__dirname, `./commands/${folder}`))
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
      }
    }
  },
};
