<p align="center">
    <a href="https://discordapp.com/api/oauth2/authorize?client_id=504508062929911869&permissions=67456064&scope=bot">
        <img src="https://wildcard.yiff.church/i/ovgxbdm4.png" />
    </a>
</p>

# <p align="center">HolidayBot</p>
<p align="center">A discord bot created with <a href="https://github.com/bwmarrin/discordgo">DiscordGo</a> that spits out real holidays that you may have never heard of before. All holidays are grabbed from <a href="https://checkiday.com">Checkiday</a></p>
<p align="center">
  <img src="https://top.gg/api/widget/status/504508062929911869.svg" alt="HolidayBot" /></p>

### <p align="center">Vote for HolidayBot on [Top.gg!](https://top.gg/bot/504508062929911869/vote)</p>

## Commands list
Default prefix is `h]`

* `help` - Shows a list of all commands
* `about` - Shows infomation about the bot (invite, voting, source, purpose, author, etc.)
* `settings` - Displays current server-specific settings.
* `ping` - Pong!
* `stats` - Shows bot statistics like uptime, lib versions, etc.
* `h [region]` - Displays holidays in the specified region or server region on command (if enabled)
* `set` - Sets server-specific settings (Manage Server permission required)
    * `set prefix <add|remove> <desiredPrefix>` - Changes the prefixes used on this server (default: `h]`)
    * `set region <desiredRegion>` - Changes the region to any valid tz/zoneinfo database region (eg. `America/Chicago`). See list [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). This is used for the daily posting region, as well as the default region used when `h [region]` is run. By default, this will be the timezone associated with the server region.
    * `set adult <on|off>` - Enables/disables content that may not be safe for viewing by children (default: `off`/`false`)
    * `set daily <on|off>` - Enables/disables the bot posting new holidays every midnight in the set region (default: `on`/`true`)
    * `set dailyChannel <channelMention|channelID>` - Sets the channel the daily holidays (if enabled) will be posted in. Permission to read and send messages and embed links must be granted in the channel before setting it. By default, this will be the first channel the bot is able to send messages in.
    * `set command <on|off>` - Enables/disables the ability for users to run `h [region]` to display holidays on command (default: `on`/`true`)
    * `set reset` - Resets this guild's settings to the default settings


## Pictures/Examples
![Image](https://i.barkloaf.com/IswVIlmAJ.png "command")
![Image](https://i.barkloaf.com/qHLql1R6K.png "daily")


## Disclaimer
Holidays listed are largely US and international only, no matter which region the holidays are displayed in, only the timezone makes the difference. This is nothing I can really control, as there lacks a good holiday database I can use like this. However, every holiday listed is legally recognized by SOMEONE.
#### But hey, the world is so globalized now, does it really matter?