let clc = require("cli-color");
let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");

module.exports.run = async (client) => {
    client.user.setPresence({ game: { name: 'for h]help', type: "WATCHING" }, status: 'online' });
    client.misc.cmdHook(null, "info", "start", null, null, null)
};