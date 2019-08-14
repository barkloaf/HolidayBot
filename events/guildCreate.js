let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");

module.exports.run = async (client, guild) => {
    client.db.createGuild(guild, client);
    client.misc.cmdHook(null, "info", "join", null, guild, null);
}