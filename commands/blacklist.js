const config = require("../config.json");
const bl = require("../bl.js");
let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");


module.exports.run = async (client, message, args, cmdHook, roCMD, DBResult) => {
    if(message.author.id === config.ownerID) {
        const [blacklisteeID, ...ignored] = args;
        if(!client.users.get(`${blacklisteeID}`)) {
            client.misc.cmdHook(message.content, "fail", "PERM", message.author, message.guild, null)
            return message.channel.send({embed: {
                color: 0xc6373e,
                author: {
                name: client.user.username,
                icon_url: client.user.displayAvatarURL
                },
                title: "Error!",
                description: "No user",
                footer: {
                    icon_url: message.author.displayAvatarURL,
                    text: message.author.username
                }
            }});
        }
        let reason = message.content.slice(`${DBResult.prefix}`.length + "blacklist".length + 1 + `${blacklisteeID}`.length + 1)

        client.bl.blacklist(blacklisteeID, reason)

        message.channel.send({embed: {
            color: 1069660,
            author: {
                name: "HolidayBot",
                icon_url: client.user.displayAvatarURL
            },
            title: `Successfully blacklisted ${client.users.get(`${blacklisteeID}`).tag} (${blacklisteeID})!`,
            footer: {
                icon_url: message.author.displayAvatarURL,
                text: message.author.username
            }
        }});

    } else {
        client.misc.cmdHook(message.content, "fail", "PERM", message.author, message.guild);
        return message.channel.send({embed: {
            color: 0xc6373e,
            author: {
              name: client.user.username,
              icon_url: client.user.displayAvatarURL
            },
            title: "Error!",
            description: "You do not have permission to run `blacklist`",
            footer: {
                icon_url: message.author.displayAvatarURL,
                text: message.author.username
            }
        }});
    }
    
    client.misc.cmdHook(message.content, "succ", null, message.author, message.guild, null);
};

module.exports.help = {
    name: "blacklist"
}