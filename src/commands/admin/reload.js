const fs = require("fs");
const path = require("path");

module.exports = {
  name: "reload",
  description: "Przeładuj komendę.",
  args: true,
  guildOnly: false,
  permissions: "ADMINISTRATOR",
  execute(message, args) {
    // message.channel.send("Test komendy... 😎👍");
    if (!args.length)
      return message.channel.send(
        `${message.author.tag}, nie podałeś żadnej komendy do przeładowania`
      );

    const commandName = args[0].toLowerCase();
    const command =
      message.client.commands.get(commandName) ||
      message.client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command)
      return message.channel.send(
        `${message.author.tag}, komenda lub alias ${commandName} nie istnieje.`
      );

    const commandFolders = fs.readdirSync(
      path.resolve(__dirname, "../../commands")
    );
    const folderName = commandFolders.find((folder) =>
      fs
        .readdirSync(path.resolve(__dirname, `../../commands/${folder}`))
        .includes(`${commandName}.js`)
    );

    delete require.cache[
      require.resolve(`../${folderName}/${command.name}.js`)
    ];

    try {
      const newCommand = require(`../${folderName}/${command.name}.js`);
      message.client.commands.set(newCommand.name, newCommand);
      message.channel.send(`Komenda \`${command.name}\` została przeładowana!`);
    } catch (error) {
      console.error(error);
      message.channel.send(
        `Wystąpił błąd przy ładowaniu komendy: \`${command.name}\`:\n\`${error.message}\``
      );
    }
  },
};
