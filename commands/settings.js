let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");
const Discord = require("discord.js");

module.exports.run = async (client, message, args, cmdHook, roCMD, DBResult) => {
    const embed = new Discord.RichEmbed()
    .setTitle(`Current guild settings for ${message.guild.name}`)
    .setAuthor("HolidayBot", `${client.user.displayAvatarURL}`)
    .setColor(0x10525C)
    .setDescription("Run `help set` for more information")
    .setFooter(message.author.username, message.author.avatarURL)
    .setThumbnail(message.guild.iconURL)
    .addField("Prefix (default: `h]`):", DBResult.prefix)
    .addField("Region (defaut: `" + `${client.misc.getDefaultRegion(message.guild)}` + "`):", DBResult.region)
    .addField("Adult (default: `false`):", DBResult.adult)
    .addField("Daily Posting (default: `true`):", DBResult.daily)
    .addField("Daily Posting Channel (if enabled) (default: `" + `${client.misc.getDefaultChannel(message.guild)}` + "`):", "<#" + DBResult.dailyChannel + ">")
    .addField("Holiday Command (if enabled) (default `true`):", DBResult.command)

    message.channel.send({embed});

    client.misc.cmdHook(message.content, "succ", null, message.author, message.guild, null);
};

module.exports.help = {
    name: "settings"
};