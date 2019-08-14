let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");
const config = require("./config.json");
const Discord = require("discord.js");
let clc = require("cli-color");

module.exports = class {
    constructor() {}

    getDefaultChannel(guild) {
        if(guild.channels.has(guild.id))
          return guild.channels.get(guild.id)
      
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

    getDefaultRegion(guild) {
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

    cmdHook(content, type, subType, assocUser, assocGuild, assocTz) {
        var embedContent = [""];
        var whichWh = 0;
        switch(type) {
            case "succ":
                console.log(`[${clc.green("SUCC")}] ${assocUser.tag} (ID: ${assocUser.id}) ran "${content}" in "${assocGuild.name}" (ID: ${assocGuild.id})`);
                whichWh = 1;
                embedContent = [0x1ca037, `${assocUser.tag} (ID: ${assocUser.id})`, `Ran \`${content}\` in __${assocGuild.name}__ (ID: ${assocGuild.id})`];
                break;
            case "fail":
                console.log(`[${clc.red("FAIL")}][${clc.magenta(`${subType}`)}] ${assocUser.tag} (ID: ${assocUser.id}) ran "${content}" in "${assocGuild.name}" (ID: ${assocGuild.id})`);
                whichWh = 2;
                embedContent = [0xc6373e, `${assocUser.tag} (ID: ${assocUser.id})`, `[**${subType}**] Ran \`${content}\` in __${assocGuild.name}__ (ID: ${assocGuild.id})`];
                break;
            case "dp":
                switch(subType) {
                    case "succ":
                        console.log(`[${clc.green("SUCC")}] Daily Posted in "${assocGuild.name}" (ID: ${assocGuild.id}) (tz: ${assocTz})`);
                        whichWh = 1;
                        embedContent = [0x1ca037, `Successfully daily posted in \`${assocGuild.name}\` (ID: ${assocGuild.id})`, `tz: __${assocTz}__`];
                        break;
                    case "fail":
                        console.log(`[${clc.red("FAIL")}] Attempted to daily post in "${assocGuild.name}" tz: ${assocTz} but ${content}`);
                        whichWh = 2;
                        embedContent = [0xc6373e, `Failure to daily post in \`${assocGuild.name}\` (ID: ${assocGuild.id}) tz: __${assocTz}__`, `but ${content}`];
                        break;
                }
                break;
            case "info":
                switch(subType) {
                    case "join":
                        console.log(`[${clc.blue("INFO")}] New guild: "${assocGuild.name}" (ID: ${assocGuild.id})`);
                        embedContent = [0x10525c, `New guild: \`${assocGuild.name}\` (ID: ${assocGuild.id})`, ``];
                        break;
                    case "leave":
                        console.log(`[${clc.blue("INFO")}] Removed from guild: "${assocGuild.name}" (ID: ${assocGuild.id})`);
                        embedContent = [0x10525c, `Removed from guild: \`${assocGuild.name}\` (ID: ${assocGuild.id})`, ``];
                        break;
                    case "nameChange":
                        console.log(`[${clc.blue("INFO")}] Guild "${content}" (ID: ${assocGuild.id}) has changed their name to "${assocGuild.name}`);
                        embedContent = [0x10525c, `Guild \`${content}\` (ID: ${assocGuild.id}) has changed their name to __${assocGuild.name}__`, ``];
                        break;
                    case "channelDelete":
                        console.log(`[${clc.blue("INFO")}] Guild "${assocGuild.name}" (ID: ${assocGuild.id}) has deleted their daily channel. Resetting to ${content}`);
                        embedContent = [0x10525c, `Guild \`${assocGuild.name}\` (ID: ${assocGuild.id}) deleted their daily channel.`, `Resetting to __${content}__`];
                        break;
                    case "start":
                        console.log(`[${clc.blue("INFO")}] Bot Started!`);
                        embedContent = [0x10525c, `Bot Started!`, ``];
                        break;
                }
                break;
        }
        switch(whichWh) {
            case 0: var whObj = new Discord.WebhookClient(config.whInfoID, config.whInfoToken); break;
            case 1: var whObj = new Discord.WebhookClient(config.whSuccID, config.whSuccToken); break;
            case 2: var whObj = new Discord.WebhookClient(config.whFailID, config.whFailToken); break;
        }
        
        return whObj.send({embeds: [{
            color: embedContent[0],
            title: embedContent[1],
            description: embedContent[2],
            timestamp: new Date()
        }]});
    }
}