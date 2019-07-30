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
    console.log("[" + clc.green("SUCC") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
    cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "SUCC" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`) 
};

module.exports.help = {
    name: "ping"
}