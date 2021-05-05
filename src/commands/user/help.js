const { prefix } = require("../../../config.json");
const {
  helpEmbed,
  helpEmbedCommandDoesntExist,
} = require("../../templates/helpTemplates");

module.exports = {
  name: "help",
  aliases: ["h", "pomoc", "komendy", "commands"],
  description: "Wyświetla pomoc dotyczącą dostępnych komend",
  usage: "[<nazwa komendy>]",
  args: false,
  guildOnly: false,
  cooldown: 0,
  execute(message, args) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push("**Lista wszystkich dostępnych komend:**");
      data.push(commands.map((command) => command.name).join("\n"));
      data.push(
        `Możesz użyć *${prefix}help <nazwa komendy>* aby zobaczyć informacje o danej komendzie.`
      );

      helpEmbed.description = data.toString;

      return message.author
        .send({ content: "Oto twoja pomoc sensei~", embed: helpEmbed })
        .then(() => {
          if (message.channel.type === "dm") return;
          message.reply("zobacz pomoc w wiadomości prywatnej 😎👍");
        })
        .catch((err) => {
          console.error(
            `Nie mogłam wysłać pomocy w DM do ${message.author.tag}.\n`,
            error
          );
          message.reply(
            "wygląda na to, że nie mogę wysłać Ci pomocy. Czy masz wyłączone wiadomości prywatne?"
          );
        });
    } else {
      const name = args[0].toLowerCase();
      const command =
        commands.get(name) ||
        commands.find((c) => c.aliases && c.aliases.includes(name));

      if (!command) {
        return message.author.send(helpEmbedCommandDoesntExist);
      }

      data.push(`**Nazwa:** ${command.name}`);
      if (command.aliases)
        data.push(`**Aliasy:** ${command.aliases.join(", ")}`);
      if (command.description) data.push(`**Opis:** ${command.description}`);
      if (command.usage)
        data.push(`**Użycie:** *${prefix}${command.name} ${command.usage}*`);

      data.push(`**Czas odnowienia:** ${command.cooldown || 3} sekund(y)`);

      message.channel.send(data, { split: true });
    }
  },
};
