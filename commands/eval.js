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
            if(output.length > 1028) output = "\`\`\`js\noverflow\`\`\`";
            const embed = new Discord.RichEmbed()
                .setColor(0x10525C)
                .setTitle("✅ Eval Successful")
                .addField("Input", `\`\`\`${roCMD}\`\`\``)
                .addField("Output", output);
            message.channel.send(embed);
        } catch (err) {
            client.misc.cmdHook(message.content, "fail", "ERR", message.author, message.guild, null);
            const embed = new Discord.RichEmbed()
                .setColor(0x10525C)
                .setTitle("❌ Eval Failed")
                .addField("Input", `\`\`\`${roCMD}\`\`\``)
                .addField("Output", err);
            return message.channel.send(embed);
        }
    } else {
        client.misc.cmdHook(message.content, "fail", "PERM", message.author, message.guild, null);
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
    client.misc.cmdHook(message.content, "succ", null, message.author, message.guild, null);
};

module.exports.help = {
    name: "eval"
}