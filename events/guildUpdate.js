let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");

module.exports.run = async (client, oldGuild, newGuild) => {
    client.db.updateGuildName(newGuild.id, newGuild.name);
    console.log("[" + clc.blue("INFO") + "] " + `Guild "${oldGuild.name}" (ID: ${newGuild.id}) has changed their name to "${newGuild.name}"`);
    client.cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "INFO" + "**] " + `Guild \`${oldGuild.name}\` (ID: ${newGuild.id}) has changed their name to \`${newGuild.name}\``)
};