const Discord = require("discord.js")
const { prefix } = require("..")

module.exports = {
    name: "messageCreate", 
    run: async function runAll(bot, message){ 
        const {client, prefix, owners} = bot
        
        if (!message.guild) return

        if (message.author.bot) return
        
        if(!message.content.startsWith(prefix))
            return

        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const cmdstr = args.shift().toLowerCase()


        let command = client.commands.get(cmdstr)
        if(!command) return

        let member = message.member

        if(command.devOnly && !owners.includes(member.id)){
            return message.reply("Don't tell me what to do bitch. This command is only available to real niggas!")
        }

        if (command.permissions && member.permissions.missing(command.permissions).length !== 0){
            return message.reply("You ain't got enough motion to use this command lil nigga")
        }

        try { 
            await command.run({...bot, message, args})
        }
        catch(err){
            let errMsg = err.toString()

            if (errMsg.startsWith("?")){
                errMsg = errMsg.slice(1)
                await message.reply
            }
            else
                console.error(err)
        }
    }
}