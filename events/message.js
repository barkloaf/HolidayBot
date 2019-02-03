const bl = require("../blacklist.json");
const clc = require("cli-color");
const moment = require('moment');
require('moment-timezone');
require("moment-duration-format");
const updateBL = (bl) => {
    fs.writeFile ("./blacklist.json", JSON.stringify(bl, null, 4), function(err) {
        if (err) throw err;
        });
}

module.exports.run = async (client, message) => {
    if(!message.guild) return;
    if(message.author.bot) return;
    let prefixDBResult = await client.db.r.table("guilds").get(message.guild.id).getField("prefix").run()
    if(message.content.indexOf(prefixDBResult) !== 0) return;

    if(bl[message.author.id] !== undefined) {
        if(message.author.tag !== bl[message.author.id]["tag"]) {
            bl[message.author.id]["tag"] = message.author.tag;
            updateBL(bl);
        }
        console.log("[" + clc.red("FAIL") + "] " + "[" + clc.magenta("BL") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
        client.cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "FAIL" + "**] " + "[**" + "BL" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`)
        return message.channel.send({embed: {
            color: 0xc6373e,
            author: {
            name: client.user.username,
            icon_url: client.user.displayAvatarURL
            },
            title: "You have been blacklisted!",
            description: "If you feel this is an error, please contact the bot owner, <@219117197178568708>",
            fields: [{
                name: "Reason:",
                value: "`" + `${bl[message.author.id]["reason"]}` + "`"
            }],
            footer: {
                icon_url: message.author.displayAvatarURL,
                text: message.author.username
            }
        }});
    }

    const args = message.content.split(/\s+/g);
    const botCommand = args.shift().slice(prefixDBResult.length).toLowerCase();
    const roCMD = message.content.slice(prefixDBResult.length + botCommand.length + 1)

    const cmd = client.commands.get(botCommand)
    if (!cmd) return
    cmd.run(client, message, args, client.cmdHook, roCMD)
};