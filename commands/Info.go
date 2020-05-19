package commands

//Info struct
type Info struct {
	Name      string
	Function  func(Params) bool
	Desc      string
	ShortDesc string
	Syntax    string
}

//InfoList array
var InfoList []Info

//Help info
var Help Info

//About info
var About Info

//Settings info
var Settings Info

//Ping info
var Ping Info

//Stats info
var Stats Info

//H info
var H Info

//Set info
var Set Info

//SetInfoList array
var SetInfoList []Info

//SetPrefix info
var SetPrefix Info

//SetRegion info
var SetRegion Info

//SetAdult info
var SetAdult Info

//SetDaily info
var SetDaily Info

//SetDailyChannel info
var SetDailyChannel Info

//SetCommand info
var SetCommand Info

//SetReset Info
var SetReset Info

//OwnerInfoList array
var OwnerInfoList []Info

//Blacklist info
var Blacklist Info

//Eval info
var Eval Info

//Die info
var Die Info

//Unblacklist info
var Unblacklist Info

func init() {
	Help = Info{
		Name:     "help",
		Function: help,
		Desc:     "Shows this message",
		Syntax:   "help",
	}
	About = Info{
		Name:      "about",
		Function:  about,
		Desc:      "Shows infomation about the bot (invite, voting, source, purpose, author, etc.)",
		ShortDesc: "Shows information about the bot",
		Syntax:    "about",
	}
	Settings = Info{
		Name:     "settings",
		Function: settings,
		Desc:     "Displays current server-specific settings",
		Syntax:   "settings",
	}
	Ping = Info{
		Name:     "ping",
		Function: ping,
		Desc:     "Pong!",
		Syntax:   "ping",
	}
	Stats = Info{
		Name:      "stats",
		Function:  stats,
		Desc:      "Shows bot statistics like uptime, lib versions, etc.",
		ShortDesc: "Shows bot statistics",
		Syntax:    "stats",
	}
	H = Info{
		Name:      "h",
		Function:  h,
		Desc:      "Displays holidays in the specified region or server region on command (if enabled)",
		ShortDesc: "Displays holidays in the specified region or server region on command (if enabled)",
		Syntax:    "h [region]",
	}
	Set = Info{
		Name:      "set",
		Function:  set,
		Desc:      "Sets server-specific settings (Manage Server permission required), run `help set` for settings list and syntax",
		ShortDesc: "Sets server-specific settings (Manage Server permission required)",
		Syntax:    "set <setting> [args]",
	}

	SetPrefix = Info{
		Name:      "prefix",
		Function:  setPrefix,
		Desc:      "Changes the prefixes used on this server (default: `h]`)",
		ShortDesc: "Changes the prefixes used on this server",
		Syntax:    "set prefix <add|remove> <desiredPrefix>",
	}
	SetRegion = Info{
		Name:      "region",
		Function:  setRegion,
		Desc:      "Changes the region to any valid tz/zoneinfo database region (eg. `America/Chicago`). See list [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). This is used for the daily posting region, as well as the default region used when `h [region]` is run. By default, this will be the timezone associated with the server region.",
		ShortDesc: "Changes the region to any valid tz/zoneinfo database region (eg. `America/Chicago`). See list [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)",
		Syntax:    "set region <desiredRegion>",
	}
	SetAdult = Info{
		Name:      "adult",
		Function:  setAdult,
		Desc:      "Enables/disables content that may not be safe for viewing by children (default: `off`/`false`)",
		ShortDesc: "Enables/disables content that may not be safe for viewing by children",
		Syntax:    "set adult <on|off>",
	}
	SetDaily = Info{
		Name:      "daily",
		Function:  setDaily,
		Desc:      "Enables/disables the bot posting new holidays every midnight in the set region (default: `on`/`true`)",
		ShortDesc: "Enables/disables the bot posting new holidays every midnight in the set region",
		Syntax:    "set daily <on|off>",
	}
	SetDailyChannel = Info{
		Name:      "dailychannel",
		Function:  setDailyChannel,
		Desc:      "Sets the channel the daily holidays (if enabled) will be posted in. Permission to read and send messages and embed links must be granted in the channel before setting it. By default, this will be the first channel the bot is able to send messages in.",
		ShortDesc: "Sets the channel the daily holidays (if enabled) will be posted in. Permission to read and send messages and embed links must be granted in the channel before setting it",
		Syntax:    "set dailyChannel <channelMention|channelID>",
	}
	SetCommand = Info{
		Name:      "command",
		Function:  setCommand,
		Desc:      "Enables/disables the ability for users to run `h [region]` to display holidays on command (default: `on`/`true`)",
		ShortDesc: "Enables/disables the ability for users to run `h [region]` to display holidays on command",
		Syntax:    "set command <on|off>",
	}
	SetReset = Info{
		Name:      "reset",
		Function:  setReset,
		Desc:      "Resets this guild's settings to the default settings",
		ShortDesc: "Resets this guild's settings to the default settings",
		Syntax:    "set reset",
	}

	Blacklist = Info{
		Name:      "blacklist",
		Function:  blacklist,
		ShortDesc: "Blacklists a user from the bot",
		Syntax:    "blacklist <userMention|userID>",
	}
	Eval = Info{
		Name:      "eval",
		Function:  eval,
		ShortDesc: "Evaluates code given",
		Syntax:    "eval <code>",
	}
	Die = Info{
		Name:      "die",
		Function:  die,
		ShortDesc: "Kills the bot",
		Syntax:    "die",
	}
	Unblacklist = Info{
		Name:      "unblacklist",
		Function:  unblacklist,
		ShortDesc: "Removes a user from the blacklist",
		Syntax:    "unblacklist <userMnetion|userID>",
	}

	InfoList = append(InfoList, Help, About, Settings, Ping, Stats, H, Set)
	SetInfoList = append(SetInfoList, SetPrefix, SetRegion, SetAdult, SetDaily, SetDailyChannel, SetCommand, SetReset)
	OwnerInfoList = append(OwnerInfoList, Blacklist, Eval, Die, Unblacklist)

	commandMapper()
}
