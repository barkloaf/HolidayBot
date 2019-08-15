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
    createGuild(guild, client) {
        return this.r.table('guilds').insert([{
            id: guild.id,
            guildname: guild.name,
            prefix: "h]",
            region: client.misc.getDefaultRegion(guild),
            adult: false,
            daily: true,
            dailyChannel: client.misc.getDefaultChannel(guild).id,
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