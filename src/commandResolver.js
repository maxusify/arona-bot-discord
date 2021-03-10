const Discord = require("discord.js");
const { prefix } = require("../config.json");

module.exports = {
  runCommand(client, message, cooldowns) {
    // Sprawdzenie czy komenda zaczyna się od prefixu oraz czy autor nie jest botem
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Rozdzielenie wiadomości na komendę i argumenty
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase(); // wycięcie nazwy komendy

    // Wybierz komendę z kolekcji komend
    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );
    if (!command) return; // Jeśli komenda nie istnieje - zakończ

    // Sprawdzenie czy komenda przeznaczona tylko dla serwerów jest używana na serwerze
    if (command.guildOnly && message.channel.type === "dm") {
      return message.reply(
        "Ta komenda nie może być użyta w wiadomościach prywatnych."
      );
    }

    // Sprawdzenie permisji Discord
    if (command.permissions) {
      const authorPerms = message.channel.permissionsFor(message.author);

      if (!authorPerms || !authorPerms.has(command.permissions)) {
        return message.reply("You can not do this!");
      }
    }

    // Jeśli użytkownik nie podał argumentów pokaż mu prawidłowe użycie
    if (command.args && !args.length) {
      let reply = `${message.author} nie podałeś żadnych argumentów dla komendy!`;

      if (command.usage) {
        reply += `\nPrawidłowe użycie: \`${prefix}${command.name} ${command.usage}\``;
      }

      return message.channel.send(reply);
    }

    // Mechanizm cooldownu
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          `poczekaj ${timeLeft.toFixed(1)} sekund(y) przed kolejnym użyciem \`${
            command.name
          }\`.`
        );
      }
    }

    // Wykonanie komendy
    try {
      command.execute(message, args);
    } catch (err) {
      console.error(err);
      message.reply("Wystąpił!");
    }
  },
};
