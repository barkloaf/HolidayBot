let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");
const config = require("../config.json");

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
                    client.misc.cmdHook(message.content, "fail", "SYN", message.author, message.guild, null);
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
                    client.misc.cmdHook(message.content, "fail", "SYN", message.author, message.guild, null);
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
                    client.misc.cmdHook(message.content, "fail", "SYN", message.author, message.guild, null);
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
                    client.misc.cmdHook(message.content, "fail", "SYN", message.author, message.guild, null);
                    return message.channel.send({embed: {
                        color: 0xc6373e,
                        author: {
                        name: client.user.username,
                        icon_url: client.user.displayAvatarURL
                        },
                        title: "Error!",
                        description: `Not a valid tz/zoneinfo database region (e.g. \`${client.misc.getDefaultRegion(message.guild)}\`). See list of all valid regions [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).`,
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
                    client.misc.cmdHook(message.content, "fail", "PERM", message.author, message.guild, null);
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
                client.db.updateRegion(message.guild.id, client.misc.getDefaultRegion(message.guild));
                client.db.updateAdult(message.guild.id, false);
                client.db.updateDaily(message.guild.id, true);
                client.db.updateDailyChannel(message.guild.id, client.misc.getDefaultChannel(message.guild).id);
                client.db.updateCommand(message.guild.id, true);

                break;
            default:
                client.misc.cmdHook(message.content, "fail", "SYN", message.author, message.guild, null);
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
        client.misc.cmdHook(message.content, "fail", "PERM", message.author, message.guild, null);
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
    client.misc.cmdHook(message.content, "succ", null, message.author, message.guild, null);
}

module.exports.help = {
    name: "set"
};
