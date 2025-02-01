const Discord = require("discord.js")
require("dotenv").config()

const generateImage = require("./generateImage")

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

let bot = {
    client, 
    prefix: "n.", 
    owners: ["762478478233829377"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.slashcommands = new Discord.Collection()
client.buttons = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot,reload) => require("./handlers/commands")(bot, reload)
client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)
client.loadButtons = (bot, reload) => require("./handlers/buttons")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)
client.loadSlashCommands(bot, false)
client.loadButtons(bot, false)

module.exports = bot
// client.on("ready", () => {
//     console.log(`Logged in as ${client.user.tag}`)
// })

client.on("messageCreate", (message) => {
    if (message.content == "hi"){
        message.reply("shut up faggot")
    }
})

const welcomeChannelID = "1334968184209412147"

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelID).send({
        content: `<@${member.id}> Oil Up Fuck Nigga`,
        files: [img]
    })
})

// client.slashcommands = new Discord.Collection()

// client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)
// client.loadSlashCommands(bot, false)

// client.on("interactionCreate", (interaction) => {
//     if (!interaction.isCommand()) return
//     if (!interaction.inGuild()) return interaction.reply("This command can only be used amongst real niggas")

//     const slashcmd = client.slashcommands.get(interaction.commandName)
    
//     if (!slashcmd) return interaction.reply("Invalid slash command Chief")

//     if(slashcmd.perms && !interaction.member.permissions.has(slashcmd.perm))  
//         return interaction.reply("You ain't got enough motion to use this command lil nigga")
    
//     slashcmd.run(client, interaction)
// })

client.login(process.env.TOKEN)

