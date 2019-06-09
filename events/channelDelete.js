let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");

const getDefaultChannel = (guild) => {
    // get "original" default channel
    if(guild.channels.has(guild.id))
      return guild.channels.get(message.guild.id)
  
    // Check for a "general" channel, which is often default chat
    const generalChannel = guild.channels.find(channel => channel.name === "general");
    if (generalChannel && generalChannel.permissionsFor(guild.client.user).has("SEND_MESSAGES") && generalChannel.permissionsFor(guild.client.user).has("EMBED_LINKS"))
      return generalChannel;
    // Now we get into the heavy stuff: first channel in order where the bot can speak
    // hold on to your hats!
    return guild.channels
     .filter(c => c.type === "text" &&
       c.permissionsFor(guild.client.user).has("SEND_MESSAGES") && c.permissionsFor(guild.client.user).has("EMBED_LINKS"))
     .sort((a, b) => a.position - b.position ||
       Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
     .first();
  }

module.exports.run = async (client, channel) => {
    let dailyChannelDBResult = await client.db.r.table("guilds").get(channel.guild.id).getField("dailyChannel").run();

    if(channel.id === dailyChannelDBResult){
        client.db.updateDailyChannel(channel.guild.id, getDefaultChannel(channel.guild).id);
    }
}