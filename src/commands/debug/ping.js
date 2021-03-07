module.exports = {
  name: "ping",
  description: "Ping! Command.",
  args: false,
  execute(message, args) {
    message.channel.send("Pong! 😎👍");
  },
};
