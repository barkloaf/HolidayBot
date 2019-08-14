const Discord = require("discord.js");
let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");

module.exports.run = async (client,  message, args, cmdHook, roCMD, DBResult) => {
    message.channel.send({embed: {
        color: 0x10525C,
        author: {
            name: client.user.username,
            icon_url: client.user.displayAvatarURL
        },
        title: `HolidayBot Stats`,
        fields: [{
            name: "# of guilds",
            value: client.guilds.size
        },
        {
            name: "# of users",
            value: client.users.size
        },
        {
            name: "discord.js Version",
            value: Discord.version
        },
        {
            name: "Node.js Version",
            value: process.version
        },
        {
            name: "Memory Usage",
            value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MiB`
        },
        {
            name: "Uptime",
            value: `${moment.duration(client.uptime).format("D [days], H [hrs], m [mins], s [secs]")}`
        }
        ],
        footer: {
            icon_url: message.author.displayAvatarURL,
            text: message.author.username
        }
    }});
    client.misc.cmdHook(message.content, "succ", null, message.author, message.guild, null);
}

module.exports.help = {
    name: "stats"
}