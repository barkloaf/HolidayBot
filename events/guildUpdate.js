let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");

module.exports.run = async (client, oldGuild, newGuild) => {
    if(oldGuild.name !== newGuild.name) {
        client.db.updateGuildName(newGuild.id, newGuild.name);
        client.misc.cmdHook(oldGuild.name, "info", "nameChange", null, newGuild, null);
    }
};