const ytdl = require("ytdl-core");

module.exports = {
  name: "play",
  aliases: ["p", "pl"],
  description: "Odtwarzaj muzykę z YouTube",
  usage: "<url> | <search term>",
  args: true,
  guildOnly: true,
  cooldown: 5,
  execute(message, args) {
    if (
      message.member.voice.channel &&
      args[0].startsWith("https://www.youtube") // TODO: Poprawić sprawdzanie adresu
    ) {
      message.member.voice.channel.join().then((connection) => {
        const stream = ytdl(args[0], { filter: "audioonly" });

        const dispatcher = connection.play(stream);

        dispatcher.on("finish", () => message.member.voice.channel.leave());
      });
    }
  },
};
