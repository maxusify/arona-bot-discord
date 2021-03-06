const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");

/* config.json */
const { prefix } = require("../config.json");

// dotenv
dotenv.config();

// discord client
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Ready...");
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);
  try {
    command.execute(message, args);
  } catch (err) {
    console.error(err);
    message.reply("There was an error trying to execute that command!");
  }
});

client.login(process.env.TOKEN);
