let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");
const Discord = require("discord.js");

const getDefaultChannel = (guild) => {
    // get "original" default channel
    if(guild.channels.has(guild.id))
      return guild.channels.get(message.guild.id)
  
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

    if(guild.region === "brazil") {
        defaultRegion = "America/Sao_Paulo";
    } else if(guild.region === "us-west") {
        defaultRegion = "America/Los_Angeles";
    } else if(guild.region === "japan") {
        defaultRegion = "Asia/Tokyo";
    } else if(guild.region === "singapore") {
        defaultRegion = "Asia/Singapore";
    } else if(guild.region === "eu-central") {
        defaultRegion = "Europe/Berlin";
    } else if(guild.region === "hongkong") {
        defaultRegion = "Asia/Hong_Kong";
    } else if(guild.region === "us-south") {
        defaultRegion = "America/Chicago";
    } else if(guild.region === "southafrica") {
        defaultRegion = "Africa/Johannesburg";
    } else if(guild.region === "us-central") {
        defaultRegion = "America/Chicago";
    } else if(guild.region === "london") {
        defaultRegion = "Europe/London";
    } else if(guild.region === "us-east") {
        defaultRegion = "America/Toronto";
    } else if(guild.region === "sydney") {
        defaultRegion = "Australia/Sydney";
    } else if(guild.region === "eu-west") {
        defaultRegion = "Europe/Paris";
    } else if(guild.region === "amsterdam") {
        defaultRegion = "Europe/Amsterdam";
    } else if(guild.region === "frankfurt") {
        defaultRegion = "Europe/Berlin";
    } else if(guild.region === "russia") {
        defaultRegion = "Europe/Moscow";
    } else {
        defaultRegion = "UTC";
    }

    return defaultRegion;
}

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