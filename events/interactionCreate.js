module.exports = {
	name: "interactionCreate",
	run: async (bot, interaction) => {
		if (interaction.isCommand()) handleSlashCommand(bot, interaction)
		else if (interaction.isButton()) handleButton(bot, interaction)
	},
}

const handleButton = (bot, interaction) => {
	const {client} = bot 

	// "name-param1-param2-...."
	const [name, ...params] = interaction.customId.split("-")
	
	const button = client.buttons.get(name)

	if (button) return 
	button.run(client, interaction, params)
}
 
const handleSlashCommand = (bot, interaction) => {
	const {client} = bot
	if (!interaction.inGuild()) return interaction.reply("This command can only be used amongst real niggas")

	const slashcmd = client.slashcommands.get(interaction.commandName)

	if (!slashcmd) return

	// check permissions
	if (slashcmd.perms && !interaction.member.permissions.has(slashcmd.perms))
		return interaction.reply("You ain't got enough motion to use this command lil nigga")

	slashcmd.run(client, interaction)
}

