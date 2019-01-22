let clc = require("cli-color")
let moment = require("moment")
require("moment-timezone");
require("moment-duration-format");
const RSSParser = require("rss-parser");

module.exports.run = async (client, message, args, cmdHook, roCMD) => {
    let prefixDBResult = await client.db.r.table("guilds").get(message.guild.id).getField("prefix").run()
    let regionDBResult = await client.db.r.table("guilds").get(message.guild.id).getField("region").run()
    let adultDBResult = await client.db.r.table("guilds").get(message.guild.id).getField("adult").run()
    let dailyDBResult = await client.db.r.table("guilds").get(message.guild.id).getField("daily").run()
    let dailyChannelDBResult = await client.db.r.table("guilds").get(message.guild.id).getField("dailyChannel").run()
    let commandDBResult = await client.db.r.table("guilds").get(message.guild.id).getField("command").run()

    let [cmdRegion, ...ignored] = args;

    if(commandDBResult === false && message.author.id !== config.ownerID) {
        console.log("[" + clc.red("FAIL") + "] " + "[" + clc.magenta("PERM") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
        cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "FAIL" + "**] " + "[**" + "PERM" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`)
        return message.channel.send({embed: {
            color: 0xc6373e,
            author: {
              name: client.user.username,
              icon_url: client.user.displayAvatarURL
            },
            title: "Error!",
            description: "This guild has disabled the use of `h`.",
            footer: {
                icon_url: message.author.displayAvatarURL,
                text: message.author.username
            }
        }});
    }

    if(cmdRegion === undefined){
        cmdRegion = regionDBResult
    }

    if(moment.tz.zone(`${cmdRegion}`)) {
        if(adultDBResult === true){
            adultURL = "&adult=true";
        } else {
            adultURL = "";
        };

        var cmdURL = `https://www.checkiday.com/rss.php?tz=${cmdRegion}${adultURL}`;
        

        let items = "";
        let parser = new RSSParser();
        parser.parseURL(cmdURL, function(err, feed) {
            feed.items.forEach(item => items += `\n\n` + "• " + `**${item.title}**` + "")
            message.channel.send({embed: {
                color: 0x10525C,
                author: {
                    name: client.user.username,
                    icon_url: client.user.displayAvatarURL
                },
                title: `Today's Holidays in region ${cmdRegion}`,
                url: "https://checkiday.com",
                fields: [{
                    name: `${feed.pubDate}`.slice(0, 16),
                    value: items
                }],
                footer: {
                    icon_url: message.author.displayAvatarURL,
                    text: message.author.username
                }
            }});
        });
    } else {
        console.log("[" + clc.red("FAIL") + "] " + "[" + clc.magenta("SYN") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
        cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "FAIL" + "**] " + "[**" + "SYN" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`)
        return message.channel.send({embed: {
            color: 0xc6373e,
            author: {
              name: client.user.username,
              icon_url: client.user.displayAvatarURL
            },
            title: "Error!",
            description: "Not a valid tz/zoneinfo database region. See list of all valid regions [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).",
            footer: {
                icon_url: message.author.displayAvatarURL,
                text: message.author.username
            }
        }});
    }
    console.log("[" + clc.green("SUCC") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
    cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "SUCC" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`) 
};

module.exports.help = {
    name: "h"
}