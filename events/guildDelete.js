let clc = require("cli-color")
let moment = require("moment")
require("moment-timezone");
require("moment-duration-format");

module.exports.run = async (client, guild) => {
    console.log("[" + clc.blue("INFO") + "] " + `Removed from guild: "${guild.name}" (ID: ${guild.id})`);
    client.cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "INFO" + "**] " + `Removed from guild: \`${guild.name}\` (ID: ${guild.id})`)
}