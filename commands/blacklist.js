const Discord = require("discord.js");
let clc = require("cli-color")
let moment = require("moment")
require("moment-timezone");
require("moment-duration-format");
const config = require("../config.json");
const fs = require("fs")
const bl = require("../blacklist.json");
const updateBL = (bl) => {
    fs.writeFile ("./blacklist.json", JSON.stringify(bl, null, 4), function(err) {
        if (err) throw err;
        }
        );
}

module.exports.run = async (client, message, args, cmdHook, roCMD) => {
    let prefixDBResult = await client.db.r.table("guilds").get(message.guild.id).getField("prefix").run()

    if(message.author.id === config.ownerID) {
        if(message.mentions.users.first() === undefined) {
            console.log("[" + clc.red("FAIL") + "] " + "[" + clc.magenta("SYN") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
            cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "FAIL" + "**] " + "[**" + "SYN" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`)
            return message.channel.send({embed: {
                color: 0xc6373e,
                author: {
                name: client.user.username,
                icon_url: client.user.displayAvatarURL
                },
                title: "Error!",
                description: "No mentioned user",
                footer: {
                    icon_url: message.author.displayAvatarURL,
                    text: message.author.username
                }
            }});
        }
        console.log(message.mentions.users.first())
        let blUser = message.mentions.users.first().id;
        let reason = message.content.slice(prefixDBResult.length + "blacklist".length + 1 + `${message.mentions.users.first()}`.length + 1)

        bl[blUser] = {};
        bl[blUser]["tag"] = message.mentions.users.first().tag;
        bl[blUser]["date"] = moment().format('Do MMMM YYYY, HH:mm:ss')
        bl[blUser]["reason"] = `${reason}`
        updateBL(bl);
        message.channel.send({embed: {
            color: 1069660,
            author: {
                name: "HolidayBot",
                icon_url: client.user.displayAvatarURL
            },
            title: "Successfully blacklisted `" + `${blUser}` + "`!",
            footer: {
                icon_url: message.author.displayAvatarURL,
                text: message.author.username
            }
        }});

    } else {
        console.log("[" + clc.red("FAIL") + "] " + "[" + clc.magenta("PERM") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
        cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "FAIL" + "**] " + "[**" + "PERM" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`)
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
    console.log("[" + clc.green("SUCC") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
    cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "SUCC" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`) 
};

module.exports.help = {
    name: "blacklist"
}