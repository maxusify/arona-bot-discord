const ytdl = require("ytdl-core");
const player = require("discordjs-ytdl");
const { MessageEmbed } = require("discord.js");
const {
  musicPlayNoChannelEmbed,
  errorEmbed,
} = require("../../templates/musicTemplates");
const {
  permsNoConnect,
  permsNoSpeak,
} = require("../../templates/permsTemplates");

module.exports = {
  name: "play",
  aliases: ["p", "pl"],
  description: "Odtwarzaj muzykę z YouTube",
  usage: "<url>",
  args: true,
  guildOnly: true,
  cooldown: 5,

  async execute(message, args) {
    const { channel } = message.member.voice;

    // Jeśli autor nie jest na kanale głosowym -> wyślij komunikat i zakończ.
    if (!channel)
      return message.channel.send({ embed: musicPlayNoChannelEmbed });

    /* SPRAWDZENIE PERMISJI */
    const permissions = channel.permissionsFor(message.client.user);

    if (!permissions.has("CONNECT"))
      // Jeśli bot nie ma permisji CONNECT
      return message.channel.send({ embed: permsNoConnect });

    if (!permissions.has("SPEAK"))
      // Jeśli bot nie ma permisji SPEAK
      return message.channel.send({ embed: permsNoSpeak });

    if (args[0].startsWith("https://www.youtube.com/watch?v=")) {
    } else {
      const key = process.env.YOUTUBE_API_KEY;
      const connection = await message.member.voice.channel.join();
      const vidID = await player.id(args, key);
      const title = await player.title(args, key);
      const thumbnail = await player.thumbnail(vidID);
      const vidDesc = `https://youtube.com/watch?v=${vidID}`;
      await player.play(connection, args, key);

      /* EMBED - Odtwarzana piosenka */
      const playEmbed = {
        color: 0x00ff80,
        author: {
          name: "Arona Music Player",
          icon_url: "https://i.imgur.com/RoAOjbl.png",
        },
        title: `${title}`,
        description: `${vidDesc}`,
        // image: {
        //   url: `${thumbnail}`,
        // },
        thumbnail: {
          url: `${thumbnail}`,
        },
        fields: [
          {
            name: "Długość",
            value: `0:00`,
          },
        ],
        timestamp: new Date(),
        footer: {
          text: `Zakolejkowane przez - ${message.author.tag}`,
          icon_url: message.author.avatarURL(),
        },
      };

      console.log(playEmbed);
      message.channel.send({ embed: playEmbed });
    }
  },
};
