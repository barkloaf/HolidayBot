let moment = require("moment");
require("moment-timezone");
require("moment-duration-format");
const rethink = require("rethinkdbdash");

module.exports = class {
    constructor() {
        this.r = rethink({
            db: "HolidayBot" 
        })
    }

    blacklist(blacklisteeID, reason) {
        return this.r.table('blacklist').insert([{
            id: blacklisteeID,
            reason: reason,
            date: moment().format('Do MMMM YYYY, HH:mm:ss')
        }]).run()
        .catch((e) => console.log(e))
    }
    updateReason(blacklisteeID, newReason) {
        return this.r.table('blacklist').get(blacklisteeID).update({
            reason: newReason
        }).run();
    }
    unBlacklist(blacklisteeID) {
        return this.r.table('blacklist').get(blacklisteeID).delete().run();
    }
}