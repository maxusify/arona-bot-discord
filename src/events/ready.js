const { botStatus } = require("../../config.json");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`Zalogowano jako ${client.user.tag}`);
    client.user.setActivity(botStatus.status, botStatus.type);
  },
};
