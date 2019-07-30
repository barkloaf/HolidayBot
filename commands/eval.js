const Discord = require("discord.js");
const config = require("../config.json");
let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");

module.exports.run = async (client, message, args, cmdHook, roCMD, DBResult) => {
    if(message.author.id === config.ownerID) {
        const settings = message.settings;
        try {
            const evaled = eval(roCMD);
            let output = `\`\`\`js\n${evaled}\n\`\`\``
            if(output.length > 1028) output = "\`\`\`js\nundefined\`\`\`";
            const embed = new Discord.RichEmbed()
                .setColor(0x10525C)
                .setTitle("✅ Eval Successful")
                .addField("Input", `\`\`\`${roCMD}\`\`\``)
                .addField("Output", output);
            message.channel.send(embed);
        } catch (err) {
            console.log("[" + clc.red("FAIL") + "] " + "[" + clc.magenta("ERR") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
            cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "FAIL" + "**] " + "[**" + "ERR" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`)
            const embed = new Discord.RichEmbed()
                .setColor(0x10525C)
                .setTitle("❌ Eval Failed")
                .addField("Input", `\`\`\`${roCMD}\`\`\``)
                .addField("Output", err);
            return message.channel.send(embed);
        }
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
            description: "You do not have permission to run `eval`",
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
    name: "eval"
}