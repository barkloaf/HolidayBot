let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");

module.exports.run = async (client) => {
    client.user.setPresence({ game: { name: 'for h]help', type: "WATCHING" }, status: 'online' });
    console.log("[" + clc.blue("INFO") + "] " + `Bot Started!`);
    client.cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "INFO" + "**] " + `Bot Started!`)
};