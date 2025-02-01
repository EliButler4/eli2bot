const { Interaction } = require("discord.js")


const run = async (client, interaction) => { 
    let member = interaction.options.getMember("user")
    let reason = interaction.options.getString("reason") || "they a bitch"

    if(!member) return interaction.reply("This nigga not even in this server bruh")

    try{
        await interaction.guild.members.kick(member, reason)
        return interaction.reply(`${member.user.tag} found out what the shape of Italy was bc... ${reason}`) 

    }   
    catch(err){
        if (err){
            console.error(err)
            return interaction.reply(`My fault I messed up tryna kick ${member.user.tag}`)
        }
    } 



}

module.exports = { 
    name: "kick", 
    description: "Kick a member", 
    perm: "KICK_MEMBERS",
    options: [
        {
            name: "user", description: "The User to kick", 
            type: "USER", required: true
        },
        {
            name: "reason", 
            description: "reason for punishment", 
            type: "STRING", 
            required: false
        }
    ], run 
}