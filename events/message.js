const clc = require("cli-color");
const config = require("../config.json");
const moment = require('moment');
require('moment-timezone');
require("moment-duration-format");

const getDefaultChannel = (guild) => {
    if(guild.channels.has(guild.id))
      return guild.channels.get(message.guild.id)
  
    const generalChannel = guild.channels.find(channel => channel.name === "general");
    if (generalChannel && generalChannel.permissionsFor(guild.client.user).has("SEND_MESSAGES") && generalChannel.permissionsFor(guild.client.user).has("EMBED_LINKS"))
      return generalChannel;

    return guild.channels
     .filter(c => c.type === "text" &&
       c.permissionsFor(guild.client.user).has("SEND_MESSAGES") && c.permissionsFor(guild.client.user).has("EMBED_LINKS"))
     .sort((a, b) => a.position - b.position ||
       Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
     .first();
  }

module.exports.run = async (client, message) => {
    if(!message.guild) return;
    if(message.author.bot) return;
    let DBResult = await client.db.r.table("guilds").get(message.guild.id).run();
    let BLResult = await client.bl.r.table("blacklist").get(message.author.id).run();
    if(message.content.indexOf(DBResult.prefix) !== 0) return;

    const args = message.content.split(/\s+/g);
    const botCommand = args.shift().slice(`${DBResult.prefix}`.length).toLowerCase();
    const roCMD = message.content.slice(`${DBResult.prefix}`.length + botCommand.length + 1)
    let dailyCObj = client.channels.get(`${DBResult.dailyChannel}`);

    const cmd = client.commands.get(botCommand)
    if (!cmd) return
    if(message.channel.permissionsFor(message.guild.client.user).has("EMBED_LINKS") === false || message.channel.permissionsFor(message.guild.client.user).has("SEND_MESSAGES") === false) {
        if(message.channel.permissionsFor(message.guild.client.user).has("SEND_MESSAGES") === false){
            message.author.send("I need permission to send messages and/or embed links!");
        } else message.channel.send("I need permission to embed links here!");
        return;
    }
    if(BLResult) {
        console.log("[" + clc.red("FAIL") + "] " + "[" + clc.magenta("BL") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
        client.cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "FAIL" + "**] " + "[**" + "BL" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`)
        return message.channel.send({embed: {
            color: 0xc6373e,
            author: {
            name: client.user.username,
            icon_url: client.user.displayAvatarURL
            },
            title: "You have been blacklisted!",
            description: `If you feel this is an error, please contact the bot owner, <@${config.ownerID}>`,
            fields: [{
                name: "Reason:",
                value: "`" + `${BLResult.reason}` + "`"
            }],
            footer: {
                icon_url: message.author.displayAvatarURL,
                text: message.author.username
            }
        }});
    }

    cmd.run(client, message, args, client.cmdHook, roCMD, DBResult)

    if(DBResult.daily === true) {
      if(dailyCObj.permissionsFor(message.guild.me).has("SEND_MESSAGES") === false || dailyCObj.permissionsFor(message.guild.me).has("EMBED_LINKS") === false) {
        message.channel.send(`**WARNING:** Daily posting is enabled, however permissions for me to send messages and/or embed links in <#${dailyCObj.id}> has been revoked, and daily posting will not work until changed.`)
      }
    }
};