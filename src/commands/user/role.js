module.exports = {
  name: "role",
  description: "Ping! Command.",
  usage: "<user> <role>",
  args: true,
  execute(message, args) {
    message.channel.send("Test komendy... 😎👍");
  },
};
