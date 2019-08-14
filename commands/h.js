let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");
const RSSParser = require("rss-parser");

module.exports.run = async (client, message, args, cmdHook, roCMD, DBResult) => {

    let [cmdRegion, ...ignored] = args;

    if(DBResult.command === false && message.author.id !== config.ownerID) {
        client.misc.cmdHook(message.content, "fail", "PERM", message.author, message.guild, null);
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
        cmdRegion = DBResult.region
    }

    if(moment.tz.zone(`${cmdRegion}`)) {
        if(DBResult.adult === true){
            adultURL = "&adult=true";
        } else {
            adultURL = "";
        };

        var cmdURL = `https://www.checkiday.com/rss.php?tz=${cmdRegion}${adultURL}`;
        
        let items = "";
        let parser = new RSSParser();
        parser.parseURL(cmdURL, function(err, feed) {
            try {feed.items.forEach(item => items += `\n\n` + "• " + `**${item.title}**` + "")}
            catch (error) {
                client.misc.cmdHook(message.content, "fail", "ERR", message.author, message.guild, null);
                return message.channel.send({embed: {
                    color: 0xc6373e,
                    author: {
                        name: client.user.username,
                        icon_url: client.user.displayAvatarURL
                    },
                    title: "Error!",
                    description: "There was an error gathering the feed from [Checkiday](https://checkiday.com) (This is most likely their fault!)",
                    footer: {
                        icon_url: message.author.displayAvatarURL,
                        text: message.author.username
                    }
                }});
            }
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
        client.misc.cmdHook(message.content, "fail", "SYN", message.author, message.guild, null);
        return message.channel.send({embed: {
            color: 0xc6373e,
            author: {
              name: client.user.username,
              icon_url: client.user.displayAvatarURL
            },
            title: "Error!",
            description: `Not a valid tz/zoneinfo database region (e.g. \`${client.misc.getDefaultRegion(message.guild)}\`). See list of all valid regions [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).`,
            footer: {
                icon_url: message.author.displayAvatarURL,
                text: message.author.username
            }
        }});
    }
    client.misc.cmdHook(message.content, "succ", null, message.author, message.guild, null);
};

module.exports.help = {
    name: "h"
}