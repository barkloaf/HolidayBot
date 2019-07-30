const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const dbFile = require("./db.js");
const blFile = require("./bl.js");
const fs = require("fs");
const RSSParser = require("rss-parser");
const moment = require('moment');
const clc = require("cli-color");

require('moment-timezone');
require("moment-duration-format");

client.db = new dbFile();
client.db.init();
client.bl = new blFile();

client.cmdHook = new Discord.WebhookClient(config.whID, config.whToken);
client.commands = new Discord.Collection();
let tzArray = moment.tz.names();
const cron = require('node-cron');
var log = console.log;

fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err)
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let cmdFunction = require(`./commands/${file}`);
        client.commands.set(cmdFunction.help.name, cmdFunction);
    });
});

fs.readdir("./events/", (err, files) => {
    if (err) console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let eventFunc = require(`./events/${file}`);
        let eventName = file.split(".")[0];

        client.on(eventName, (...args) => eventFunc.run(client, ...args));
    });
});

console.log = function () {
    var first_parameter = arguments[0];
    var other_parameters = Array.prototype.slice.call(arguments, 1);

    function formatConsoleDate (date) {
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var milliseconds = date.getMilliseconds();

        return '[' +
               clc.blackBright(((hour < 10) ? '0' + hour: hour)) +
               clc.blackBright(':') +
               clc.blackBright(((minutes < 10) ? '0' + minutes: minutes)) +
               clc.blackBright(':') +
               clc.blackBright(((seconds < 10) ? '0' + seconds: seconds)) +
               '] ';
    }

    log.apply(console, [formatConsoleDate(new Date()) + first_parameter].concat(other_parameters));
};

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

client.on('error', () => {});
let parser = new RSSParser();

for(let tz of tzArray) {
    cron.schedule('2 0 */1 * *' , async () => {
        let scheduleWait = require("util").promisify(setTimeout);
        for(let guild of client.guilds.array()) {
            let wait = require("util").promisify(setTimeout);
            let DBResult = await client.db.r.table("guilds").get(guild.id).run();
            let dailyCObj = client.channels.get(`${DBResult.dailyChannel}`);
            let dailyAdult = ""
            if(DBResult.adult === true) {
                dailyAdult = "&adult=true"
            }
            if(DBResult.region === tz && DBResult.daily === true) {
                if(dailyCObj.permissionsFor(guild.me).has("SEND_MESSAGES") === false || dailyCObj.permissionsFor(guild.me).has("EMBED_LINKS") === false) {
                    console.log("[" + clc.red("FAIL") + "] " + "[" + clc.magenta("PERM") + "] " + `Attempted to daily post in "${guild.name}" but permission was revoked.`);
                    client.cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "FAIL" + "**] " + "[**" + "PERM" + "**] " + `Attempted to daily post in \`${guild.name}\` but permission was revoked.`)
                    continue;
                };
                let items = "";
                parser.parseURL(`https://www.checkiday.com/rss.php?tz=${tz}${dailyAdult}`, function(err, feed) {
                    try {feed.items.forEach(item => items += `\n\n` + "• " + `**${item.title}**` + "")}
                    catch (err) {}
                    if(items === "") {
                        console.log("[" + clc.red("FAIL") + "] " + "[" + clc.magenta("ERR") + "] " + `Attempted to daily post in "${guild.name}" but there was a feed error.`);
                        client.cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "FAIL" + "**] " + "[**" + "ERR" + "**] " + `Attempted to daily post in \`${guild.name}\` but there was a feed error.`)
                        client.channels.get(`${DBResult.dailyChannel}`).send({embed: {
                            color: 0xc6373e,
                            author: {
                                name: client.user.username,
                                icon_url: client.user.displayAvatarURL
                            },
                            title: "Error!",
                            description: `There was an error gathering the feed from [Checkiday](https://checkiday.com) (This is most likely their fault!)`,
                            footer: {
                                icon_url: client.user.displayAvatarURL,
                                text: "HolidayBot Daily Posting"
                            }
                        }});
                    } else {
                        client.channels.get(`${DBResult.dailyChannel}`).send({embed: {
                            color: 0x3a1cbb,
                            author: {
                                name: client.user.username,
                                icon_url: client.user.displayAvatarURL
                            },
                            title: `Today's Holidays in region ${tz}`,
                            url: "https://checkiday.com",
                            fields: [{
                                name: `${feed.pubDate}`.slice(0, 16),
                                value: items
                            }],
                            footer: {
                                icon_url: client.user.displayAvatarURL,
                                text: "HolidayBot Daily Posting"
                            }
                        }});
                    }
                });
            } else continue;
            console.log("[" + clc.green("SUCC") + "] " + `Daily Posted in "${guild.name}" (ID: ${guild.id}) (tz: ${tz})`);
            client.cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "SUCC" + "**] " + `Daily Posted in \`${guild.name}\` (ID: ${guild.id}) (tz: __${tz}__)`);
            await wait(5000);
            continue;
        }
        await scheduleWait(5000);
    }, {
    scheduled: true,
    timezone: tz
    });
  }; 



client.login(config.token);