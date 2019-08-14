# HolidayBot
A discord bot created with discord.js that spits out real holidays that you may have never heard of before. All holidays are grabbed from https://checkiday.com

### Vote for HolidayBot on [discordbots.org!](https://discordbots.org/bot/504508062929911869)

[![Invite](https://wildcard.yiff.church/i/ovgxbdm4.png)](https://discordapp.com/api/oauth2/authorize?client_id=504508062929911869&permissions=67456064&scope=bot)

## Commands list
Default prefix is `h]`

* `help` - Shows a list of all commands
* `about` - Shows information about the bot (purpose, author, etc.)
* `settings` - Displays current server-specific settings.
* `ping` - Pong!
* `stats` - Shows bot statistics like uptime, lib versions, etc.
* `h [region]` - Displays holidays in the specified region or server region on command (if enabled)
* `set` - Sets server-specific settings (Manage Server permission required)
    * `set prefix <desiredPrefix>` - Changes the prefix used on this server (default: `h]`)
    * `set region <desiredRegion>` - Changes the region to any valid tz/zoneinfo database region. See list [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). This is used for the daily posting region, as well as the default region used when `h [region]` is run. By default, this will be the timezone associated with the server region.
    * `set adult <on|off>` - Enables/disables content that may not be safe for viewing by children (default: `off`/`false`)
    * `set daily <on|off>` - Enables/disables the bot posting new holidays every midnight in the set region (default: `on`/`true`)
    * `set dailyChannel <channelTag>` - Sets the channel the daily holidays (if enabled) will be posted in. By default, this will either be any channel named `general` or the first channel the bot is able to send messages in.
    * `set command <on|off>` - Enables/disables the ability for users to run `h [region]` to display holidays on command (default: `on`/`true`)
    * `set reset` - Resets this guild's settings to the default settings


## Pictures/Examples
![Image](https://i.barkloaf.com/IswVIlmAJ.png "command")
![Image](https://i.barkloaf.com/qHLql1R6K.png "daily")


## Disclaimer
Holidays listed are largely US and international only, no matter which region the holidays are displayed in, only the timezone makes the difference. This is nothing I can really control, as there lacks a good holiday database I can use like this. However, every holiday listed is legally recognized by SOMEONE.
#### But hey, the world is so globalized now, does it really matter?