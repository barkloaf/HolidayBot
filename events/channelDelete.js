let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");

module.exports.run = async (client, channel) => {
    let DBResult = await client.db.r.table("guilds").get(channel.guild.id);

    if(channel.id === DBResult.dailyChannel){
        client.db.updateDailyChannel(channel.guild.id, client.misc.getDefaultChannel(channel.guild).id);
        client.misc.cmdHook(`${client.misc.getDefaultChannel(channel.guild).id}`, "info", "channelDelete", null, channel.guild, null);
    }
}