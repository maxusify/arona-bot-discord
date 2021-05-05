module.exports = {
  name: "stop",
  description: "Zatrzymaj muzykę",
  args: false,
  guildOnly: true,
  cooldown: 5,

  async execute(message) {
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

    await message.member.voice.channel.leave();
    message.react("✅");
  },
};
