const Discord = require('discord.js');
const get = require('node-fetch');

class magik {

    /**
     * @name magik
     * @kind constructor
     * @param {Object} options options
     * @param {Object} [options.mentions] The message mentions
     * @param {Object} [options.author] The author of the message
     */

    constructor(options) {
        if(!options.mentions) throw new TypeError('DT Error: Missing argument mentions')

        if(!options.author) throw new TypeError('DT Error: Missing argument author')

        this.options = options
    }
    async create() {

    let numb = Math.ceil(Math.random() * 10)
    let user = this.options.mentions.users.first() ? this.options.mentions.users.first().displayAvatarURL({format: 'png', size: 512}) : this.options.author.displayAvatarURL({format: 'png', size: 512});

    const httpsreq = 'https://nekobot.xyz/api/imagegen?type=magik&image=' + user + '&intensity=' + numb;
    
    const data = await get(
        httpsreq
        ).then((res) => res.json());

    let embed = new Discord.MessageEmbed()
    .setImage(data.message)
    const data2 = {
        link: data.message,
        embed: embed
    }
    return data2;
    }
}

module.exports = magik