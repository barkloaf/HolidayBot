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


const rethink = require("rethinkdbdash")

module.exports = class { 
    constructor() {
        this.r = rethink({
            db: "HolidayBot" 
        })
    }
    init() {
        return this.r.tableCreate('guilds').run() 
            .then(() => console.log("Guild and settings table created."))
            .catch((e) => {
                if (e.name === "ReqlOpFailedError") {
                } else {
                    console.error(`There was an unexpected error with the database. ${e}. Exiting. Please ignore all the text spammed at the start of console`)
                    process.exit(1)
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