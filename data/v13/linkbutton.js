const Discord = require('discord.js');

class linkbutton {

    /**
     * @name linkbutton
     * @kind constructor
     */

    constructor() {
        this.options = {
            link: 'https://discord.com',
            emoji: null,
            label: 'Discord'
        }

    }
    /**
     * Set the emoji of the button
     * @param {String} emoji 
     */
    setEmoji(emoji){
        if(!emoji) throw new TypeError('DT Error: Missing argument emoji')
        if(typeof emoji !== 'string') throw new TypeError('DT Error: emoji must be a string')
        this.options.emoji = emoji
    }
    /**
     * Set the label of the button
     * @param {String} label 
     */
    setLabel(label){
        if(!label) throw new TypeError('DT Error: Missing argument label')
        if(typeof label !== 'string') throw new TypeError('DT Error: label must be a string')
        this.options.label = label
    }
    /**
     * Set the link of the button
     * @param {String} link 
     */
    setLink(link){
        if(!link) throw new TypeError('DT Error: Missing argument link')
        if(typeof link !== 'string') throw new TypeError('DT Error: link must be a string')
        this.options.link = link
    }
    /**
     * 
     * @param {"ACTION_ROW"|"BUTTON"} type 
     * @returns Discord Button
     */
    create(type='BUTTON') {
        const button = new Discord.MessageButton()
        .setLabel(this.options.label)
        .setURL(this.options.link)
        .setStyle('LINK')
        if(this.options.emoji){
            button.setEmoji(this.options.emoji)
        }
        if(type === 'BUTTON'){
            return button
        } else if(type === 'ACTION_ROW'){
            return new Discord.MessageActionRow().addComponents(button)
        } else { return null }
    }
}
module.exports = linkbutton