const Discord = require("discord.js");
let clc = require("cli-color")
let moment = require("moment")
require("moment-timezone");
require("moment-duration-format");

module.exports.run = async (client, message, args, cmdHook, roCMD) => {
    const embed = new Discord.RichEmbed()
    .setTitle("Hello, my name is HolidayBot!")
    .setAuthor("HolidayBot", `${client.user.displayAvatarURL}`)
    .setColor(0x10525C)
    .setDescription("I am a bot created with discord.js that spits out real holidays that you may have never heard of before. All holidays are grabbed from [checkiday.com](https://checkiday.com)")
    .setFooter(message.author.username, message.author.avatarURL)
    .setThumbnail(client.user.displayAvatarURL)
    .addField("Check out the source", "[GitHub](https://github.com/barkloaf/HolidayBot)")
    .addField("Feedback?",
        "Feel free to contact the bot owner, \n`barkloaf#6564` | `219117197178568708` :3")

    message.channel.send({embed});

    console.log("[" + clc.green("SUCC") + "] " + `${message.author.tag} (ID: ${message.author.id}) ran "${message}" in "${message.guild.name}" (ID: ${message.guild.id})`);
    cmdHook.send("`[" + `${moment().format('DD/MM/YYYY] [HH:mm:ss')}` + "]`" + "[**" + "SUCC" + "**] " + `__${message.author.tag}__ (ID: ${message.author.id}) ran \`${message}\` in __${message.guild.name}__ (ID: ${message.guild.id})`) 
};

module.exports.help = {
    name: "about"
}