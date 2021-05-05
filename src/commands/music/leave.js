module.exports = {
  name: "leave",
  description: "Zatrzymaj odtwarzanie",
  args: false,
  guildOnly: true,
  cooldown: 5,
  execute(message, args) {
    message.member.voice.channel.leave();
  },
};
