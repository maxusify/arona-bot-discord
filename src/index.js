/* Libs imports */
const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

/* My imports */
const commandHandler = require("./commandHandler");

// dotenv
dotenv.config();

// Utworzenie klienta
const client = new Discord.Client();
commandHandler.registerCommands(client);
const cooldowns = new Discord.Collection();

// Wczytanie eventów
const eventFiles = fs
  .readdirSync(path.resolve(__dirname, "./events"))
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) =>
      event.execute(...args, client, cooldowns)
    );
  }
}

// Zaloguj bota
client.login(process.env.TOKEN);
