let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");
const config = require("../config.json");

const getDefaultChannel = (guild) => {
    if(guild.channels.has(guild.id))
      return guild.channels.get(message.guild.id)
  
    const generalChannel = guild.channels.find(channel => channel.name === "general");
    if (generalChannel && generalChannel.permissionsFor(guild.client.user).has("SEND_MESSAGES") && generalChannel.permissionsFor(guild.client.user).has("EMBED_LINKS"))
      return generalChannel;

    return guild.channels
     .filter(c => c.type === "text" &&
       c.permissionsFor(guild.client.user).has("SEND_MESSAGES") && c.permissionsFor(guild.client.user).has("EMBED_LINKS"))
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

module.exports.run = async (client, message, args, cmdHook, roCMD, DBResult) => {
    if(message.member.permissions.has("MANAGE_GUILD") || message.author.id === config.ownerID) {
        var [prop, ...ignored] = args;

        switch(`${prop}`.toLowerCase()) {
            case "prefix":
                var [prop, nPrefix, ...ignored] = args;

                client.db.updatePrefix(message.guild.id, nPrefix);

                break;
            case "adult":
                var [prop, nAdult, ...ignored] = args;

                if(nAdult === "on" || nAdult === "true") {
                    client.db.updateAdult(message.guild.id, true)
                } else if(nAdult === "off" || nAdult === "false") {
                    client.db.updateAdult(message.guild.id, false)
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
                        description: "Syntax (`set adult`): `set adult <on|off>`",
                        footer: {
                            icon_url: message.author.displayAvatarURL,
                            text: message.author.username
                        }
                    }});
                };

                break;
            case "daily":
                var [prop, nDaily, ...ignored] = args;

                if(nDaily === "on" || nDaily === "true") {
                    dailyCObj = client.channels.get(`${DBResult.dailyChannel}`)
                    if(dailyCObj.permissionsFor(message.guild.me).has("SEND_MESSAGES") === false || dailyCObj.permissionsFor(message.guild.me).has("EMBED_LINKS") === false) {
                        return message.channel.send({embed: {
                            color: 0xc6373e,
                            author: {
                            name: client.user.username,
                            icon_url: client.user.displayAvatarURL
                            },
                            title: "Error!",
                            description: `No permission to send messages and/or embed links in set daily channel <#${dailyCObj.id}>`,
                            footer: {
                                icon_url: message.author.displayAvatarURL,
                                text: message.author.username
                            }
                        }});
                    }
                    client.db.updateDaily(message.guild.id, true)
                } else if(nDaily === "off" || nDaily === "false"){
                    client.db.updateDaily(message.guild.id, false)
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
                        description: "Syntax (`set daily`): `set daily <on|off>`",
                        footer: {
                            icon_url: message.author.displayAvatarURL,
                            text: message.author.username
                        }
                    }});
                };

                break;
            case "command":
                var [prop, nCommand, ...ignored] = args;

                if(nCommand === "on" || nCommand === "true") {
                    client.db.updateCommand(message.guild.id, true)
                } else if(nCommand === "off" || nCommand === "false") {
                    client.db.updateCommand(message.guild.id, false)
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
                        description: "Syntax (`set command`): `set command <on|off>`",
                        footer: {
                            icon_url: message.author.displayAvatarURL,
                            text: message.author.username
                        }
                    }});
                };

                break;
            case "region":
                var [prop, nRegion] = args;

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

                break;
            case "dailychannel":
                var [prop, ...ignored] = args;
                if(!message.mentions.channels.first()) {
                    return message.channel.send({embed: {
                        color: 0xc6373e,
                        author: {
                        name: client.user.username,
                        icon_url: client.user.displayAvatarURL
                        },
                        title: "Error!",
                        description: "Syntax `set dailyChannel`: `set dailyChannel <channelTag>`",
                        footer: {
                            icon_url: message.author.displayAvatarURL,
                            text: message.author.username
                        }
                    }})
                }
                let nDC = message.mentions.channels.first()
                if(nDC.permissionsFor(message.guild.me).has("SEND_MESSAGES") === false || nDC.permissionsFor(message.guild.me).has("EMBED_LINKS") === false) {
                    console.log("[" + clc.red("FAIL") + "] " + "[" + clc.magenta("PERM") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
                    cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "FAIL" + "**] " + "[**" + "PERM" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`)
                    return message.channel.send({embed: {
                        color: 0xc6373e,
                        author: {
                        name: client.user.username,
                        icon_url: client.user.displayAvatarURL
                        },
                        title: "Error!",
                        description: "No permission to send messages and/or embed links in mentioned channel.",
                        footer: {
                            icon_url: message.author.displayAvatarURL,
                            text: message.author.username
                        }
                    }})};

                client.db.updateDailyChannel(message.guild.id, nDC.id)

                break;
            case "reset":
                var [prop, ...ignored] = args;

                client.db.updatePrefix(message.guild.id, "h]");
                client.db.updateRegion(message.guild.id, getDefaultRegion(message.guild));
                client.db.updateAdult(message.guild.id, false);
                client.db.updateDaily(message.guild.id, true);
                client.db.updateDailyChannel(message.guild.id, getDefaultChannel(message.guild).id);
                client.db.updateCommand(message.guild.id, true);

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
                    description: "(`set`): Setting not recognized.",
                    footer: {
                        icon_url: message.author.displayAvatarURL,
                        text: message.author.username
                    }
                }});
            };

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
            description: "Manage Server permission required for `set`.",
            footer: {
                icon_url: message.author.displayAvatarURL,
                text: message.author.username
            }
        }})
        };
    console.log("[" + clc.green("SUCC") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
    cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "SUCC" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`) 
}

module.exports.help = {
    name: "set"
};
