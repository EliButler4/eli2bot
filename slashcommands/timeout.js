const { Interaction } = require("discord.js")

const durations = [
    { name: '60 seconds', value: 60 * 1000 },
    { name: '5 mins', value: 5 * 60 * 1000 },
    { name: '10 mins', value: 10 * 60 * 1000 },
    { name: '30 mins', value: 30 * 60 * 1000 },
    { name: '1 hr', value: 60 * 60 * 1000 },
    { name: '1 day', value: 24 * 60 * 60 * 1000 },
    { name: '1 week', value: 7 * 24 * 60 * 60 * 1000 },
]

const run = async (client, interaction) => { 
    let member = interaction.options.getMember("user")
    let duration = interaction.options.getNumber("duration")
    let reason = interaction.options.getString("reason") || "they a bitch"

    if(!member) return interaction.reply("This nigga not even in this server bruh")

    try{
        await member.timeout(duration, reason)
        return interaction.reply(`${member.user.tag} is in the naughty corner for ${durations.find(d=> duration === d.value)?.name} bc... ${reason}`) 

    }   
    catch(err){
        if (err){
            console.error(err)
            return interaction.reply(`My fault I messed up tryna timeout ${member.user.tag}`)
        }
    } 



}

module.exports = { 
    name: "timeout", 
    description: "Timeout a member", 
    perm: "MODERATE_MEMBERS",
    options: [
        {
            name: "user", description: "The User to timeout", 
            type: "USER", required: true
        },
        {
            name: "duration", 
            description: "The duration of the timeout", 
            type: "NUMBER",
            choices: durations,
            required: true
        },
        {
            name: "reason", 
            description: "reason for punishment", 
            type: "STRING", 
            required: false
        }
    ], run 
}