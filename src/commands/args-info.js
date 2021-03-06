module.exports = {
  name: "args-info",
  description: "Komenda do testowania argumentów",
  execute(message, args) {
    if (!args.length) {
      return message.channel.send(
        `Nie podałeś (@${message.author}) żadnych argumentów`
      );
    }

    message.channel.send(`Nazwa komendy: ${command}\nArgumenty: ${args}`);
  },
};
