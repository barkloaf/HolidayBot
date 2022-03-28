<p align="center">
    <a href="https://discord.com/api/oauth2/authorize?client_id=504508062929911869&permissions=19456&scope=bot%20applications.commands">
        <img src="https://wildcard.yiff.church/i/ovgxbdm4.png" />
    </a>
</p>

# <p align="center">HolidayBot</p>
<p align="center">A discord bot created with <a href="https://github.com/bwmarrin/discordgo">DiscordGo</a> that spits out real holidays that you may have never heard of before. All holidays are grabbed from <a href="https://checkiday.com">Checkiday</a></p>
<p align="center">
  <img src="https://top.gg/api/widget/status/504508062929911869.svg" alt="HolidayBot" /></p>

### <p align="center">Vote for HolidayBot on [Top.gg!](https://top.gg/bot/504508062929911869/vote)</p>

## Commands list

* `/about` - Shows infomation about the bot (invite, voting, source, purpose, author, etc.)
* `/settings` - Displays current server-specific settings.
* `/ping` - Pong!
* `/stats` - Shows bot statistics like uptime, lib versions, etc.
* `/h [timezone]` - Displays holidays in the specified timezone or server timezone on command (if enabled)
* `/set` - Sets server-specific settings (Manage Server permission required)
    * `/set timezone <timezone>` - Changes the timezone to any valid tz/zoneinfo database timezone (eg. `America/Chicago`). See list [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). This is used for the daily posting timezone, as well as the default timezone used when `/h` is run. (default: `UTC`).
    * `/set adult <True|False>` - Enables/disables content that may not be safe for viewing by children. True = Adult content enabled, False = Adult content disabled (default: `False`).
    * `/set daily <True|False>` - Enables/disables the bot posting new holidays every midnight in the set timezone (default: `True`)
    * `/set dailyChannel <channel>` - Sets the channel the daily holidays (if enabled) will be posted in. Permission to view, send messages, and embed links must be granted in the channel before setting it. By default, this will be the first channel the bot is able to send messages in.
    * `/set command <True|False>` - Enables/disables the ability for users to run `/h` to display holidays on command (default: `True`)
    * `/set reset` - Resets this guild's settings to the default settings


## Pictures/Examples
![Image](https://i.barkloaf.com/f4w1vHErm.png "command")
![Image](https://i.barkloaf.com/diHNBIwfe.png "daily")


## Disclaimer
Holidays listed are largely US and international only, no matter which timezone the holidays are displayed in, only the timezone makes the difference. This is nothing I can really control, as there lacks a good holiday database I can use like this. However, every holiday listed is legally recognized by SOMEONE.
#### But hey, the world is so globalized now, does it really matter?
