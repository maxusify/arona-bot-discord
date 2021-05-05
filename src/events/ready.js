const { botStatus } = require("../../config.json");
const colors = require("colors");
const dateFormat = require("dateformat");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    const date = new Date();
    const timeStamp = dateFormat(date, "HH:MM:ss");
    console.log(
      `[${timeStamp}] `.gray +
        `Zalogowano jako ` +
        `${client.user.tag}`.bold.yellow
    );
    client.user.setActivity(botStatus.status, botStatus.type);
  },
};
