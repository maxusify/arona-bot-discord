const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "Ping! Command.",
  args: false,
  execute(message, args) {
    // message.channel.send("Pong~!");
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#74CCF4")
      .setTitle("Arona's response:")
      .setDescription("Pong~!")
      .setThumbnail("https://i.imgur.com/RoAOjbl.png");

    message.channel.send(exampleEmbed);
  },
};
