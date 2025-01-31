const Canvas = require("canvas")
const Discord = require("discord.js")

const background = "https://i.imgur.com/6DEqast.png"

const dim = {
    height: 800,
    width: 1200, 
    margin: 50
}

const av ={
    size: 256,
    x: 200,
    y: 250
}

const generateImage = async (member) => {
    let username = member.user.username
    let discrim = member.user.discriminator
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: av.size })

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    //draw bacground
    const backimg = await Canvas.loadImage(background)
    ctx.drawImage(backimg, 0, 0)

    // draw black tinted box
    //ctx.fillStyle = "rgba(0,0,0,0.8)"
    //ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.width -2 * dim.margin)


    const avimg = await Canvas.loadImage(avatarURL)
    ctx.save()

    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true )
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()

    //Write in text
    ctx.fillStyle = "black"
    ctx.textAlign = "center"

    //draw in welcome 
    ctx.font = "60px Arial"
    ctx.fillText("Welcome to the Diddy Party", dim.width/2, dim.height - dim.margin - 50)

    ctx.font = "70px Roboto"
    ctx.fillText(username + discrim, dim.width/2, dim.height - dim.margin - 125)

    const attachement = new Discord.MessageAttachment(canvas.toBuffer(), "Welcome.png")
    return attachement





}

module.exports = generateImage