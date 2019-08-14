const clc = require("cli-color");
const config = require("../config.json");
const moment = require('moment');
require('moment-timezone');
require("moment-duration-format");

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
        client.misc.cmdHook(message.content, "fail", "BL", message.author, message.guild, null);
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