const Discord = require('discord.js');
class guildUtil {
    /**
     * 
     * @param {Discord.Guild} guild 
     */
    constructor(guild){
        this.guild = guild
    }
    /**
     * 
     * @param {"URL"|"IMAGE"} type 
     * @param {Image|String} image 
     * @param {Object} options 
     * @param {String} [options.reason] The reason
     * @param {String} [options.name]
     */
    createEmoji(type, image, options){
        let emoji;
        if(type === 'IMAGE'){
            emoji = this.guild.emojis.create(image, image.name, { reason:  options.reason })
        } else if(type === 'URL'){
            let name = image.slice(image.lastIndexOf('/')+1, image.lastIndexOf('.'))
            if(options.name){
                name = options.name
            }
            emoji = this.guild.emojis.create(image, name, { reason:  options.reason })
        }
        return emoji
    }
}

module.exports = guildUtil;