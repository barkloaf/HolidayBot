const getDefaultChannel = (guild) => {
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

const rethink = require("rethinkdbdash");

module.exports = class { 
    constructor() {
        this.r = rethink({
            db: "HolidayBot" 
        })
    }
    init() {
        if(this.r.table("guilds")) return;
        return this.r.tableCreate('guilds').run() 
            .then(() => console.log("Guild and settings table created."))
            .catch((e) => {
                if (e.name === "ReqlOpFailedError") {
                } else {
                    console.error(`There was an unexpected error with the database. ${e}. Exiting. Please ignore all the text spammed at the start of console`);
                    process.exit(1);
                }
            });
    } 
    createGuild(guild) {
        return this.r.table('guilds').insert([{
            id: guild.id,
            guildname: guild.name,
            prefix: "h]",
            region: getDefaultRegion(guild),
            adult: false,
            daily: true,
            dailyChannel: getDefaultChannel(guild).id,
            command: true
        }]).run()
        .catch((e) => console.log(e))
    }

    updatePrefix(guildID, newPrefix) {
        return this.r.table('guilds').get(guildID).update({
            prefix: newPrefix
        }).run();
    }

    updateRegion(guildID, region) {
        return this.r.table("guilds").get(guildID).update({
            region: region
        }).run();
    }

    updateAdult(guildID, newAdult) {
        return this.r.table("guilds").get(guildID).update({
            adult: newAdult
        }).run();
    }

    updateDaily(guildID, newDaily) {
        return this.r.table("guilds").get(guildID).update({
            daily: newDaily
        }).run();
    }

    updateDailyChannel(guildID, newDailyChannel) {
        return this.r.table("guilds").get(guildID).update({
            dailyChannel: newDailyChannel
        }).run();
    }

    updateCommand(guildID, newCommand) {
        return this.r.table("guilds").get(guildID).update({
            command: newCommand
        }).run();
    }

    updateGuildName(guildID, newGuildName) {
        return this.r.table("guilds").get(guildID).update({
            guildname: newGuildName
        }).run();
    }
}