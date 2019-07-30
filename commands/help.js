const Discord = require("discord.js");
let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");

module.exports.run = async = (client, message, args, cmdHook, roCMD, DBResult) => {
    const [helpSecond, ...ignored] = args;

    switch(helpSecond) {
        case undefined:
            message.channel.send({embed: {
                color: 1069660,
                author: {
                    name: "HolidayBot",
                    icon_url: client.user.displayAvatarURL
                },
                title: "HolidayBot Help",
                description: "Commands list",
                fields: [{
                    name: "`help`",
                    value: "Shows this message."
                },
                {
                    name: "`about`",
                    value: "Shows information about the bot (invite, source, purpose, author, etc.)"
                },
                {
                    name: "`settings`",
                    value: "Displays current server-specific settings."
                },
                {
                    name: "`ping`",
                    value: "Pong!"
                },
                {
                    name: "`stats`",
                    value: "Shows bot statistics like uptime, lib versions, etc."
                },
                {
                    name: "`h [region]`",
                    value: "Displays holidays in the specified region or server region on command (if enabled)"
                },
                {
                    name: "`set`",
                    value: `Sets server-specific settings (Manage Server permission required), run \`help set\` for settings list and syntax.`
                }
                ],
                footer: {
                    icon_url: message.author.displayAvatarURL,
                    text: message.author.username
                }
            }});
            break;
        case "set":
            message.channel.send({embed: {
                color: 1069660,
                author: {
                    name: "HolidayBot",
                    icon_url: client.user.displayAvatarURL
                },
                title: "HolidayBot Help",
                description: "Commands list (`set`)",
                fields: [{
                    name: "`set prefix <desiredPrefix>`",
                    value: "Changes the prefix used on this server (default: `h]`)"
                },
                {
                    name: "`set region <desiredRegion>`",
                    value: "Changes the region to any valid tz/zoneinfo database region. See list [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). This is used for the daily posting region, as well as the default region used when `h [region]` is run. By default, this will be the timezone associated with the server region."
                },
                {
                    name: "`set adult <on|off>`",
                    value: "Enables/disables content that may not be safe for viewing by children (default: `off`/`false`)"
                },
                {
                    name: "`set daily <on|off>`",
                    value: "Enables/disables the bot posting new holidays every midnight in the set region (default: `on`/`true`)"
                },
                {
                    name: "`set dailyChannel <channelTag>`",
                    value: "Sets the channel the daily holidays (if enabled) will be posted in. By default, this will either be any channel named `general` or the first channel the bot is able to send messages in."
                },
                {
                    name: "`set command <on|off>`",
                    value: "Enables/disables the ability for users to run `h [region]` to display holidays on command (default: `on`/`true`)"
                },
                {
                    name: "`set reset`",
                    value: "Resets this guild's settings to the default settings"
                }
                ],
                footer: {
                    icon_url: message.author.displayAvatarURL,
                    text: message.author.username
                }
            }});
            break;
        default:
            console.log("[" + clc.red("FAIL") + "] " + "[" + clc.magenta("SYN") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
            cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "FAIL" + "**] " + "[**" + "SYN" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`)
            return message.channel.send({embed: {
                color: 0xc6373e,
                author: {
                name: client.user.username,
                icon_url: client.user.displayAvatarURL
                },
                title: "Error!",
                description: "Syntax (`help`): see `help`",
                footer: {
                    icon_url: message.author.displayAvatarURL,
                    text: message.author.username
                }
            }});
            break;
    }
    console.log("[" + clc.green("SUCC") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
    cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "SUCC" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`) 
};

module.exports.help = {
    name: "help"
}