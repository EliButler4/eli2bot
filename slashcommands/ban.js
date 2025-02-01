const { Interaction } = require("discord.js")


const run = async (client, interaction) => { 
    let member = interaction.options.getMember("user")
    let reason = interaction.options.getString("reason") || "they a bitch"

    if(!member) return interaction.reply("This nigga not even in this server bruh")

    try{
        await interaction.guild.bans.create(member, reason)
        return interaction.reply(`FUCK ${member.user.tag} !! They are now the Opps bc... ${reason}`) 

    }   
    catch(err){
        if (err){
            console.error(err)
            return interaction.reply(`My fault I messed up tryna ban ${member.user.tag}`)
        }
    } 



}

module.exports = { 
    name: "ban", 
    description: "Ban a member", 
    perm: "BAN_MEMBERS",
    options: [
        {
            name: "user", description: "The User to ban", 
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