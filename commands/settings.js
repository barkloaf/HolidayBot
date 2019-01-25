let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");
const Discord = require("discord.js");

const getDefaultChannel = (guild) => {
    // get "original" default channel
    if(guild.channels.has(guild.id))
      return guild.channels.get(guild.id)
  
    // Check for a "general" channel, which is often default chat
    const generalChannel = guild.channels.find(channel => channel.name === "general");
    if (generalChannel)
      return generalChannel;
    // Now we get into the heavy stuff: first channel in order where the bot can speak
    // hold on to your hats!
    return guild.channels
     .filter(c => c.type === "text" &&
       c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
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

module.exports.run = async (client, message, args, cmdHook, roCMD) => {
    let prefixDBResult = await client.db.r.table("guilds").get(message.guild.id).getField("prefix").run()
    let regionDBResult = await client.db.r.table("guilds").get(message.guild.id).getField("region").run()
    let adultDBResult = await client.db.r.table("guilds").get(message.guild.id).getField("adult").run()
    let dailyDBResult = await client.db.r.table("guilds").get(message.guild.id).getField("daily").run()
    let dailyChannelDBResult = await client.db.r.table("guilds").get(message.guild.id).getField("dailyChannel").run()
    let commandDBResult = await client.db.r.table("guilds").get(message.guild.id).getField("command").run()

    const embed = new Discord.RichEmbed()
    .setTitle(`Current guild settings for ${message.guild.name}`)
    .setAuthor("HolidayBot", `${client.user.displayAvatarURL}`)
    .setColor(0x10525C)
    .setDescription("Run `help set` for more information")
    .setFooter(message.author.username, message.author.avatarURL)
    .setThumbnail(message.guild.iconURL)
    .addField("Prefix (default: `h]`):", prefixDBResult)
    .addField("Region (defaut: `" + `${getDefaultRegion(message.guild)}` + "`):", regionDBResult)
    .addField("Adult (default: `false`):", adultDBResult)
    .addField("Daily Posting (default: `true`):", dailyDBResult)
    .addField("Daily Posting Channel (if enabled) (default: `" + `${getDefaultChannel(message.guild)}` + "`):", "<#" + dailyChannelDBResult + ">")
    .addField("Holiday Command (if enabled) (default `true`):", commandDBResult)

    message.channel.send({embed});
    
    console.log("[" + clc.green("SUCC") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
    cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "SUCC" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`) 
};

module.exports.help = {
    name: "settings"
};