const Discord = require("discord.js");
const dotenv = require("dotenv").config();
const fs = require("fs");
const path = require("path");
const commandHandler = require("./commandHandler");

/*************** START ***************/
const client = new Discord.Client(); // Utworzenie klienta
const cooldowns = new Discord.Collection(); // Inicjacja cooldownów
commandHandler.registerCommands(client); // Rejestrowanie komend

// Wczytanie ścieżki do folederu z eventami
const eventPath = path.resolve(__dirname, "./events");

// Wczytanie plików eventów
const eventFiles = fs
  .readdirSync(eventPath)
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
