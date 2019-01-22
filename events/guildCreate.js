let clc = require("cli-color")
let moment = require("moment")
require("moment-timezone");
require("moment-duration-format");

module.exports.run = async (client, guild) => {
    client.db.createGuild(guild);
    console.log("[" + clc.blue("INFO") + "] " + `New guild: "${guild.name}" (ID: ${guild.id})`);
    client.cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "INFO" + "**] " + `New guild: \`${guild.name}\` (ID: ${guild.id})`)
}