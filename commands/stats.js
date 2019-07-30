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
    console.log("[" + clc.green("SUCC") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
    cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "SUCC" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`) 
}

module.exports.help = {
    name: "stats"
}