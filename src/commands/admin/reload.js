const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");

module.exports = {
  name: "reload",
  description: "Przeładuj komendę.",
  args: false,
  guildOnly: false,
  permissions: "ADMINISTRATOR",
  execute(message, args) {
    // Sprawdzenie długości argumentów
    if (!args.length) {
      const embedMessage = new Discord.MessageEmbed()
        .setColor("#D31407")
        .setTitle("Nie udało się przeładować komendy")
        .setDescription(
          `**${message.author.username}-sensei~!** Muszę wiedzieć którą komendę chcesz przeładować!`
        )
        .setThumbnail("https://i.imgur.com/RoAOjbl.png");

      return message.channel.send(embedMessage);
    }

    // Zamiana wszystkich liter na małe
    const commandName = args[0].toLowerCase();

    // Wyszukanie komend i ich aliasów
    const command =
      message.client.commands.get(commandName) ||
      message.client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    // Jeśli komenda nie istnieje wyświetl komunikat o błędzie
    if (!command) {
      const embedMessage = new Discord.MessageEmbed()
        .setColor("#D31407")
        .setTitle("Nie udało się przeładować komendy")
        .setDescription(
          `**${message.author.username}-sensei~!** Komenda lub alias który podałeś nie istnieje!`
        )
        .setThumbnail("https://i.imgur.com/RoAOjbl.png");

      return message.channel.send(embedMessage);
    }

    // Wyszukanie folderów (kategorii) komend
    const commandFolders = fs.readdirSync(
      path.resolve(__dirname, "../../commands")
    );

    // Wyszukanie folderu danej komendy
    const folderName = commandFolders.find((folder) =>
      fs
        .readdirSync(path.resolve(__dirname, `../../commands/${folder}`))
        .includes(`${commandName}.js`)
    );

    // Usunięcie starej wersji komendy z pamięci podręcznej
    delete require.cache[
      require.resolve(`../${folderName}/${command.name}.js`)
    ];

    try {
      // Pobranie nowej wersji komendy
      const newCommand = require(`../${folderName}/${command.name}.js`);

      // Dodanie nowej wersji komendy do zestawu bota
      message.client.commands.set(newCommand.name, newCommand);

      // Komunikat o sukcesie
      const embedMessage = new Discord.MessageEmbed()
        .setColor("#40FF80")
        .setTitle("Sukces!")
        .setDescription(
          `**${message.author.username}-sensei~!** Komenda \`${command.name}\` została przeładowana!`
        )
        .setThumbnail("https://i.imgur.com/RoAOjbl.png");

      return message.channel.send(embedMessage);
    } catch (error) {
      console.error(error);
      const embedMessage = new Discord.MessageEmbed()
        .setColor("#D31407")
        .setTitle("Błąd!")
        .setDescription(
          `**${message.author.username}-sensei~!** Wystąpił błąd przy przeładowaniu \`${command.name}\`!`
        )
        .setThumbnail("https://i.imgur.com/RoAOjbl.png");

      return message.channel.send(embedMessage);
    }
  },
};
