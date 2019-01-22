const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const dbFile = require("./db.js");
client.db = new dbFile();
client.db.init();
const fs = require("fs")
const RSSParser = require("rss-parser");
const moment = require('moment');
require('moment-timezone');
require("moment-duration-format")
const clc = require("cli-color");
const bl = require("./blacklist.json");
client.cmdHook = new Discord.WebhookClient(config.whID, config.whToken);
client.commands = new Discord.Collection();
let tzArray = moment.tz.names()
const cron = require('node-cron');
var log = console.log;

fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err)
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let cmdFunction = require(`./commands/${file}`)
        client.commands.set(cmdFunction.help.name, cmdFunction);
    });
});

fs.readdir("./events/", (err, files) => {
    if (err) console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let eventFunc = require(`./events/${file}`);
        let eventName = file.split(".")[0];

        client.on(eventName, (...args) => eventFunc.run(client, ...args))
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

client.on('error', () => {});
let parser = new RSSParser();

for(let tz of tzArray) {
    cron.schedule('2 0 */1 * *' , async () => {
        let scheduleWait = require("util").promisify(setTimeout);
        for(let guild of client.guilds.array()) {
            let wait = require("util").promisify(setTimeout);
            let regionDBResult = await client.db.r.table("guilds").get(guild.id).getField("region").run()
            let dailyDBResult = await client.db.r.table("guilds").get(guild.id).getField("daily").run()
            let adultDBResult = await client.db.r.table("guilds").get(guild.id).getField("adult").run()
            let dailyChannelDBResult = await client.db.r.table("guilds").get(guild.id).getField("dailyChannel").run()
            if(regionDBResult === tz && dailyDBResult === true && adultDBResult === false) {
                let items = ""
                parser.parseURL(`https://www.checkiday.com/rss.php?tz=${tz}`, function(err, feed) {
                    feed.items.forEach(item => items += `\n\n` + "• " + `**${item.title}**` + "")
                    client.channels.get(`${dailyChannelDBResult}`).send({embed: {
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
                });
            } else if(regionDBResult === tz && dailyDBResult === true && adultDBResult === true) {
                let items = ""
                parser.parseURL(`https://www.checkiday.com/rss.php?tz=${tz}&adult=true`, function(err, feed) {
                    feed.items.forEach(item => items += `\n\n` + "• " + `**${item.title}**` + "")
                    client.channels.get(`${dailyChannelDBResult}`).send({embed: {
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
                });
            } else continue;
            console.log("[" + clc.green("SUCC") + "] " + `Daily Posted in "${guild.name}" (ID: ${guild.id})`);
            client.cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "SUCC" + "**] " + `Daily Posted in in __${guild.name}__ (ID: ${guild.id})`)
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