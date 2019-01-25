let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");
const config = require("../config.json");

const getDefaultChannel = (guild) => {
    // get "original" default channel
    if(guild.channels.has(guild.id))
      return guild.channels.get(message.guild.id)
  
    // Check for a "general" channel, which is often default chat
    const generalChannel = guild.channels.find(channel => channel.name === "general");
    if (generalChannel)
      return generalChannel;
    // Now we get into the heavy stuff: first channel in order where the bot can speak
    // hold on to your hats!
    return guild.channels
     .filter(c => c.type === "text" &&
       c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
     .sort((a, b) => a.position - b.position ||
       Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
     .first();
  }

const getDefaultRegion = (guild) => {
    var defaultRegion = "";
    //brazil, us-west, japan, singapore, eu-central, hongkong, us-south, southafrica, us-central, london, us-east, sydney, eu-west, amsterdam, frankfurt, russia

    switch(guild.region) {
        case "brazil":
            defaultRegion = "America/Sao_Paulo";
            break;
        case "us-west":
            defaultRegion = "America/Los_Angeles";
            break;
        case "japan":
            defaultRegion = "Asia/Tokyo";
            break;
        case "singapore":
            defaultRegion = "Asia/Singapore";
            break;
        case "eu-central":
            defaultRegion = "Europe/Berlin";
            break;
        case "hongkong":
            defaultRegion = "Asia/Hong_Kong";
            break;
        case "us-south":
            defaultRegion = "America/Chicago";
            break;
        case "southafrica":
            defaultRegion = "Africa/Johannesburg";
            break;
        case "us-central":
            defaultRegion = "America/Chicago";
            break;
        case "london":
            defaultRegion = "Europe/London";
            break;
        case "us-east":
            defaultRegion = "America/Toronto";
            break;
        case "sydney":
            defaultRegion = "Australia/Sydney";
            break;
        case "eu-west":
            defaultRegion = "Europe/Paris";
            break;
        case "amsterdam":
            defaultRegion = "Europe/Amsterdam";
            break;
        case "frankfurt":
            defaultRegion = "Europe/Berlin";
            break;
        case "russia":
            defaultRegion = "Europe/Moscow";
            break;
        default:
            defaultRegion = "UTC";
            break;
    };

    return defaultRegion;
};

module.exports.run = async (client, message, args, cmdHook, roCMD) => {
    if(message.member.permissions.has("MANAGE_GUILD") || message.author.id === config.ownerID) {
        const [prop, ...ignored] = args;

        // Prefix command
        if(prop === "prefix") {
            const [prop, nPrefix, ...ignored] = args;

            client.db.updatePrefix(message.guild.id, nPrefix);

            // Adult Filter toggle
        } else if(prop === "adult") {
            const [prop, nAdult, ...ignored] = args;

            if(nAdult === "on" || nAdult === "true") {
                client.db.updateAdult(message.guild.id, true)
            } else if(nAdult === "off" || nAdult === "false") {
                client.db.updateAdult(message.guild.id, false)
            } else {
                console.log("[" + clc.red("FAIL") + "] " + "[" + clc.magenta("SYN") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
                cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "FAIL" + "**] " + "[**" + "SYN" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`)
                //return message.reply("Error! Syntax (`set adult`): `set adult <on|off>`");
                return message.channel.send({embed: {
                    color: 0xc6373e,
                    author: {
                    name: client.user.username,
                    icon_url: client.user.displayAvatarURL
                    },
                    title: "Error!",
                    description: "Syntax (`set adult`): `set adult <on|off>`",
                    footer: {
                        icon_url: message.author.displayAvatarURL,
                        text: message.author.username
                    }
                }});
            };

            // Daily Posting toggle
        } else if(prop === "daily") {
            const [prop, nDaily, ...ignored] = args;

            if(nDaily === "on" || nDaily === "true") {
                client.db.updateDaily(message.guild.id, true)
            } else if(nDaily === "off" || nDaily === "false"){
                client.db.updateDaily(message.guild.id, false)
            } else {
                console.log("[" + clc.red("FAIL") + "] " + "[" + clc.magenta("SYN") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
                cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "FAIL" + "**] " + "[**" + "SYN" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`)
                //return message.reply("Error! Syntax (`set daily`): `set daily <on|off>`");
                return message.channel.send({embed: {
                    color: 0xc6373e,
                    author: {
                    name: client.user.username,
                    icon_url: client.user.displayAvatarURL
                    },
                    title: "Error!",
                    description: "Syntax (`set daily`): `set daily <on|off>`",
                    footer: {
                        icon_url: message.author.displayAvatarURL,
                        text: message.author.username
                    }
                }});
            };

            // Command toggle
        } else if(prop === "command") {
            const [prop, nCommand, ...ignored] = args;

            if(nCommand === "on" || nCommand === "true") {
                client.db.updateCommand(message.guild.id, true)
            } else if(nCommand === "off" || nCommand === "false") {
                client.db.updateCommand(message.guild.id, false)
            } else {
                console.log("[" + clc.red("FAIL") + "] " + "[" + clc.magenta("SYN") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
                cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "FAIL" + "**] " + "[**" + "SYN" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`)
                //return message.reply("Error! Syntax (`set command`): `set command <on|off>`");
                return message.channel.send({embed: {
                    color: 0xc6373e,
                    author: {
                    name: client.user.username,
                    icon_url: client.user.displayAvatarURL
                    },
                    title: "Error!",
                    description: "Syntax (`set command`): `set command <on|off>`",
                    footer: {
                        icon_url: message.author.displayAvatarURL,
                        text: message.author.username
                    }
                }});
            };

            // Region setting
        } else if(prop === "region") {
            const [prop, nRegion] = args;

            if(moment.tz.zone(`${nRegion}`)) {
                client.db.updateRegion(message.guild.id, nRegion);
            } else {
                console.log("[" + clc.red("FAIL") + "] " + "[" + clc.magenta("SYN") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
                cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "FAIL" + "**] " + "[**" + "SYN" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`)
                return message.channel.send({embed: {
                    color: 0xc6373e,
                    author: {
                    name: client.user.username,
                    icon_url: client.user.displayAvatarURL
                    },
                    title: "Error!",
                    description: "Not a valid tz/zoneinfo database region. See list of all valid regions [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).",
                    footer: {
                        icon_url: message.author.displayAvatarURL,
                        text: message.author.username
                    }
                }});
            }

            // Daily Posting Channel setting
        } else if(prop === "dailyChannel") {
            const [prop, ...ignored] = args;
            let nDC = message.mentions.channels.first()
            if(!nDC.permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
                console.log("[" + clc.red("FAIL") + "] " + "[" + clc.magenta("PERM") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
                cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "FAIL" + "**] " + "[**" + "PERM" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`)
                return message.channel.send({embed: {
                    color: 0xc6373e,
                    author: {
                      name: client.user.username,
                      icon_url: client.user.displayAvatarURL
                    },
                    title: "Error!",
                    description: "No permission to send messages in mentioned channel.",
                    footer: {
                        icon_url: message.author.displayAvatarURL,
                        text: message.author.username
                    }
                }})};

            client.db.updateDailyChannel(message.guild.id, nDC.id)

        } else if(prop === "reset") {
            const [prop, ...ignored] = args;

            client.db.updatePrefix(message.guild.id, "h]");
            client.db.updateRegion(message.guild.id, getDefaultRegion(message.guild));
            client.db.updateAdult(message.guild.id, false);
            client.db.updateDaily(message.guild.id, true);
            client.db.updateDailyChannel(message.guild.id, getDefaultChannel(message.guild).id);
            client.db.updateCommand(message.guild.id, true);

        } else {
            console.log("[" + clc.red("FAIL") + "] " + "[" + clc.magenta("SYN") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
            cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "FAIL" + "**] " + "[**" + "SYN" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`)
            //return message.reply("Error! (`set`): Property not recognized.");
            return message.channel.send({embed: {
                color: 0xc6373e,
                author: {
                name: client.user.username,
                icon_url: client.user.displayAvatarURL
                },
                title: "Error!",
                description: "(`set`): Setting not recognized.",
                footer: {
                    icon_url: message.author.displayAvatarURL,
                    text: message.author.username
                }
            }});
        };


        //return message.reply("Guild settings changed. Run `settings` to view all settings.");
        message.channel.send({embed: {
            color: 0x10525c,
            author: {
            name: client.user.username,
            icon_url: client.user.displayAvatarURL
            },
            title: "Guild settings changed!",
            description: "Run `settings` to view all settings.",
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
            description: "Administrator permmission required for `set`.",
            footer: {
                icon_url: message.author.displayAvatarURL,
                text: message.author.username
            }
        }})};
        console.log("[" + clc.green("SUCC") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
    cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "SUCC" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`) 
}

module.exports.help = {
    name: "set"
};
