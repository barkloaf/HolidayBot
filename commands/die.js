const config = require("../config.json");
let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");

module.exports.run = async (client, message, args, cmdHook, roCMD, DBResult) => {
    if(message.author.id === config.ownerID) {
        message.channel.send({embed: {
            color: 1069660,
            author: {
                name: "HolidayBot",
                icon_url: client.user.displayAvatarURL
            },
            title: "Shutting Down...",
            footer: {
                icon_url: message.author.displayAvatarURL,
                text: message.author.username
            }
        }});
        client.destroy();

    } else {
        client.misc.cmdHook(message.content, "fail", "PERM", message.author, message.guild, null);
        return message.channel.send({embed: {
            color: 0xc6373e,
            author: {
              name: client.user.username,
              icon_url: client.user.displayAvatarURL
            },
            title: "Error!",
            description: "You do not have permission to run `die`",
            footer: {
                icon_url: message.author.displayAvatarURL,
                text: message.author.username
            }
        }});

    }
    client.misc.cmdHook(message.content, "succ", null, message.author, message.guild, null);
};

module.exports.help = {
    name: "die"
}