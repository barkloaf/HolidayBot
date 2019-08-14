let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");

module.exports.run = async (client, message, args, cmdHook, roCMD, DBResult) => {
    message.channel.send({embed: {
        color: 1069660,
        author: {
            name: "HolidayBot",
            icon_url: client.user.displayAvatarURL
        },
        title: "Pong!",
        description: `${Math.round(client.ping)}` + `ms`,
        footer: {
            icon_url: message.author.displayAvatarURL,
            text: message.author.username
        }
    }});
    client.misc.cmdHook(message.content, "succ", null, message.author, message.guild, null);
};

module.exports.help = {
    name: "ping"
}