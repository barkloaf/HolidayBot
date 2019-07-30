let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");
const Discord = require("discord.js");

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

const getDefaultRegion = (guild) => {
    var defaultRegion = "";
    //brazil, us-west, japan, singapore, eu-central, hongkong, us-south, southafrica, us-central, london, us-east, sydney, eu-west, amsterdam, frankfurt, russia

    switch(guild.region) {
        case "brazil":
            defaultRegion = "America/Sao_Paulo";
            break;
        case "us-west":
            defaultRegion = "America/Los_Angeles";
            break;
        case "japan":
            defaultRegion = "Asia/Tokyo";
            break;
        case "singapore":
            defaultRegion = "Asia/Singapore";
            break;
        case "eu-central":
            defaultRegion = "Europe/Berlin";
            break;
        case "hongkong":
            defaultRegion = "Asia/Hong_Kong";
            break;
        case "us-south":
            defaultRegion = "America/Chicago";
            break;
        case "southafrica":
            defaultRegion = "Africa/Johannesburg";
            break;
        case "us-central":
            defaultRegion = "America/Chicago";
            break;
        case "london":
            defaultRegion = "Europe/London";
            break;
        case "us-east":
            defaultRegion = "America/Toronto";
            break;
        case "sydney":
            defaultRegion = "Australia/Sydney";
            break;
        case "eu-west":
            defaultRegion = "Europe/Paris";
            break;
        case "amsterdam":
            defaultRegion = "Europe/Amsterdam";
            break;
        case "frankfurt":
            defaultRegion = "Europe/Berlin";
            break;
        case "russia":
            defaultRegion = "Europe/Moscow";
            break;
        default:
            defaultRegion = "UTC";
            break;
    };

    return defaultRegion;
};

module.exports.run = async (client, message, args, cmdHook, roCMD, DBResult) => {
    const embed = new Discord.RichEmbed()
    .setTitle(`Current guild settings for ${message.guild.name}`)
    .setAuthor("HolidayBot", `${client.user.displayAvatarURL}`)
    .setColor(0x10525C)
    .setDescription("Run `help set` for more information")
    .setFooter(message.author.username, message.author.avatarURL)
    .setThumbnail(message.guild.iconURL)
    .addField("Prefix (default: `h]`):", DBResult.prefix)
    .addField("Region (defaut: `" + `${getDefaultRegion(message.guild)}` + "`):", DBResult.region)
    .addField("Adult (default: `false`):", DBResult.adult)
    .addField("Daily Posting (default: `true`):", DBResult.daily)
    .addField("Daily Posting Channel (if enabled) (default: `" + `${getDefaultChannel(message.guild)}` + "`):", "<#" + DBResult.dailyChannel + ">")
    .addField("Holiday Command (if enabled) (default `true`):", DBResult.command)

    message.channel.send({embed});
    
    console.log("[" + clc.green("SUCC") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
    cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "SUCC" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`) 
};

module.exports.help = {
    name: "settings"
};