let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");

module.exports.run = async (client, guild) => {
    try {client.db.createGuild(guild, client);
    } catch(err) {
        client.misc.cmdHook(null, "info", "misconfig", null, guild, null);
        guild.owner.send("There is an error in your server config! This most likely means I have/had no permissions in any text channel. I automagically left the server but can be re-added once you fix your config. Thank you!")
            .then(() => guild.leave());
        return;
    }
    client.misc.cmdHook(null, "info", "join", null, guild, null);
}