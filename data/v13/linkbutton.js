const Discord = require('discord.js');

class linkbutton {

    /**
     * @name linkbutton
     * @kind constructor
     * @param {Object} options options
     * @param {String} [options.link] The button link
     * @param {String} [options.label] The button label
     * @returns Promise<MesssageButton>
     */

    constructor(options) {
        if(!options.link) throw new TypeError('DT Error: Missing argument link')
        if(typeof options.link !== 'string') throw new TypeError('DT Error: link must be a string')

        if(!options.label) throw new TypeError('DT Error: Missing argument label')
        if(typeof options.label !== 'string') throw new TypeError('DT Error: label must be a string')

        this.options = options
    }
    async create() {
        const button = new Discord.MessageButton()
        .setLabel(this.options.label)
        .setURL(this.options.link)
        .setStyle('LINK')
        return button
    }
}
module.exports = linkbutton