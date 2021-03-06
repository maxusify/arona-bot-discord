const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

/* config.json */
const { prefix, botStatus } = require("../config.json");

// dotenv
dotenv.config();

// Utworzenie klienta
const client = new Discord.Client();

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

// Zdarzenie: gdy bot stanie się online
client.once("ready", () => {
  console.log(`Zalogowano jako ${client.user.tag}`);
  client.user.setActivity(botStatus.status, botStatus.type);
});

client.on("message", (message) => {
  // Sprawdzenie czy komenda zaczyna się od prefixu oraz czy autor nie jest botem
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // Rozdzielenie wiadomości na komendę i argumenty
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase(); // wycięcie nazwy komendy

  // Jeśli komenda nie istnieje - zakończ
  if (!client.commands.has(commandName)) return;

  // Wybierz komendę z kolekcji komend
  const command = client.commands.get(commandName);

  // Jeśli użytkownik nie podał argumentów pokaż mu prawidłowe użycie
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  // Wykonanie komendy
  try {
    command.execute(message, args);
    console.log(`Użyto: ${command.name} ${args}`);
  } catch (err) {
    console.error(err);
    message.reply("There was an error trying to execute that command!");
  }
});

client.login(process.env.TOKEN);
