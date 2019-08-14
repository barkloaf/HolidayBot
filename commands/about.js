const Discord = require("discord.js");
let clc = require("cli-color");
const config = require("../config.json");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");

module.exports.run = async (client, message, args, cmdHook, roCMD, DBResult) => {
    const embed = new Discord.RichEmbed()
    .setTitle("Hello, my name is HolidayBot!")
    .setAuthor("HolidayBot", `${client.user.displayAvatarURL}`)
    .setColor(0x10525C)
    .setDescription("I am a bot created with discord.js that spits out real holidays that you may have never heard of before. All holidays are grabbed from [checkiday.com](https://checkiday.com)")
    .setFooter(message.author.username, message.author.avatarURL)
    .setThumbnail(client.user.displayAvatarURL)
    .addField("Check out the source and invite link!", "[GitHub](https://github.com/barkloaf/HolidayBot)")
    .addField("Vote for HolidayBot!", "[Discord Bot List](https://discordbots.org/bot/504508062929911869/vote)")
    .addField("Feedback?",
        `Feel free to contact the bot owner, <@${config.ownerID}> :3`)

    message.channel.send({embed});

    client.misc.cmdHook(message.content, "succ", null, message.author, message.guild, null);
};

module.exports.help = {
    name: "about"
}