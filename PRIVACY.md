# Privacy Policy
This document serves as the privacy policy that you agree to when adding the HolidayBot user (HolidayBot#3671, 504508062929911869) to a Discord guild, or whenever you interact with the HolidayBot user using Discord.

## Where data is stored
All data outlined in this document is currently stored at [Oracle Cloud Infrastructure](https://cloud.oracle.com) in Phoenix, Arizona, United States.

## Data collected when added to a guild
Upon adding the HolidayBot user to a guild, the following data is collected and stored:
* Guild ID

The above data is stored alongside the following **configurable** data points:
* A [tz database/zoneinfo timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) string
* Channel ID string for the channel meant to be used for daily posting
* A boolean to represent if the guild can see holidays that might not be suitable for children or not
* A boolean to represent if daily posting is enabled for the guild or not
* A boolean to represent if the /h command is enabled for the server or not

This data is stored in a password-protected [PostgreSQL](https://www.postgresql.org/) database. Although all efforts are taken to keep this data private, no data can ever be 100% secure; therefore, absolute security cannot be guaranteed.

### Why this data is stored
This data is the absolute minimum required amount to provide all of HolidayBot's features.

### How long this data is stored
This data is stored for the entire duration the HolidayBot user is in the guild. Guild data is automatically generated when the HolidayBot user is added to a guild, and is automatically deleted when the HolidayBot user is removed from that guild.

## Data collected when interacting with the HolidayBot user
For users, the following events and associated data are logged when interacting with the HoldiayBot user:
* Guild joins
    * Guild ID
* Guild removals
    * Guild ID
* Channel deletions (only if the channel is the daily posting channel associated with the guild)
    * Old channel ID
    * New (fallback) channel ID
* Daily posting execution
    * Guild ID
    * Timezone string
    * Adult boolean
    * Reason for failure (if applicable)
* Application commands
    * User ID
    * The command that was run
    * Reason for failure (if applicable)
    * Guild ID (if applicable)

### Why this data is stored
This data is stored to discover and address issues and abuse during the HolidayBot user's runtime.

### How long this data is stored
These logs are kept until the bot is restarted, and do not persist anywhere, on disk or otherwise.

---
**Last Updated:** `2022-04-03`