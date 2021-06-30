module.exports = async (message) => {
    if(!message) throw new TypeError('DT Error: Missing argument message')

    const get = require('node-fetch');
    const Discord = require('discord.js');

    let numb = Math.ceil(Math.random() * 10)
    let user = message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL({format: 'png', size: 512}) : message.author.displayAvatarURL({format: 'png', size: 512});

    const httpsreq = 'https://nekobot.xyz/api/imagegen?type=magik&image=' + user + '&intensity=' + numb;
    
    const data = await get(
        httpsreq
        ).then((res) => res.json());

    let embed = new Discord.MessageEmbed()
    .setImage(data.message)
    let btn = new Discord.MessageButton()
    .setCustomID('deletemsg')
    .setLabel('🗑 Delete')
    .setStyle('DANGER')
    //components: [[button]]
    const rarray = [];
    rarray.push(embed);
    rarray.push(btn)
    return rarray;
}