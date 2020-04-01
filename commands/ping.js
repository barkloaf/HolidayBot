let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");

module.exports.run = async (client, message, args, cmdHook, roCMD, DBResult) => {
    const startMessage = await message.channel.send({embed: {
        color: 1069660,
        author: {
            name: "HolidayBot",
            icon_url: client.user.displayAvatarURL
        },
        title: "Pinging!",
        description: "Awaiting response",
        footer: {
            icon_url: message.author.displayAvatarURL,
            text: message.author.username
        }
    }});

    let messagePing = Math.round(startMessage.createdTimestamp - message.createdTimestamp);

    startMessage.edit("", {embed: {
        color: 1069660,
        author: {
            name: "HolidayBot",
            icon_url: client.user.displayAvatarURL
        },
        title: "Pong!",
        description: `API Latency ${Math.round(client.ping)}ms\nMessage Latency: ${messagePing}`,
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