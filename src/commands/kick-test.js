module.exports = {
  name: "kick-test",
  description: "Komenda do testowania wyrzucania.",
  execute(message, args) {
    if (!message.mentions.users.size) {
      return message.reply("Musisz podać tag użytkownika aby go wyrzucić.");
    }
    const taggedUser = message.mentions.users.first();
    message.channel.send(`Chciałeś wyrzucić: ${taggedUser.username}`);
  },
};
