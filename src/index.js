/* Libs imports */
const Discord = require("discord.js");
const dotenv = require("dotenv");

/* My imports */
const commandHandler = require("./commandHandler");
const commandResolver = require("./commandResolver");

/* config.json */
const { botStatus } = require("../config.json");

// dotenv
dotenv.config();

// Utworzenie klienta
const client = new Discord.Client();
commandHandler.registerCommands(client);
const cooldowns = new Discord.Collection();

// Zdarzenie: gdy bot stanie się online
client.once("ready", () => {
  console.log(`Zalogowano jako ${client.user.tag}`);
  client.user.setActivity(botStatus.status, botStatus.type);
});

// Zdarzenie: wysłanie wiadomości z komendą
client.on("message", (message) =>
  commandResolver.runCommand(client, message, cooldowns)
);

// Zaloguj bota
client.login(process.env.TOKEN);
