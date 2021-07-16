const Discord = require('discord.js');
const { warn } = require('../util/warn');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

class pages {
    /**
     * @name pages
     * @kind constructor
     * @param {Object} options The options
     * @param {[Discord.MessageEmbed]} [options.pages] The embed pages
     * @param {Array} [options.emoji] The emojis must be an emoji id
     * @param {Number} [options.time] The time for the collector
     * @param {Discord.Message} [options.message] The message
     * @param {Discord.MessageButtonStyle} [options.style] The button style
     * @returns Promise<void>
     */
    constructor(options){
        this.options = options;

        this.message = options.message;
        
        if(!options.message) throw new TypeError(`DT Error: Missing argument message`)
        if(!options.style) throw new TypeError(`DT Error: Missing argument style`)
        if(!options.emoji) throw new TypeError(`DT Error: Missing argument emoji`)

        this.style = options.style;
        this.time = options.time || 150000;
        this.emoji = {
            e1: options.emoji[0],
            e2: options.emoji[1],
            e3: options.emoji[2]
        }
        this.pages = options.pages;
    }
    /**
     * @param {Array} pages The pages to add
     */
    async addPages(pages){
        this.pages.push(pages)
    }
    /**
     * @param {Array} pages The pages for the embeds
     */
    async setPages(pages){
        this.pages = new Array(pages)
    }
    /**
     * Sends all the pages
     * @returns Pages
     */
    buildAll() {
        this.options.message.channel.send({ embeds: this.pages });
        return this.pages
    }
    /**
     * Set the page colors
     * @param {Discord.ColorResolvable} color The color for the embeds
     * @returns Color
     */
    setColor(color) {
        for(const page of this.pages){
            page.setColor(color)
        }
        return color
    }
    /**
     * Set the page authors
     * @param {String} author The author
     * @param {String} img The img
     * @param {String} url The url
     * @returns Author
     */
    setAuthor(author, img = null, url = null){
        for(const page of this.pages){
            page.setAuthor(author, img, url)
        }
        return author
    }
    /**
     * 
     * @param {String} footer The embeds footer text 
     * @param {String} img The embeds footer img
     * @returns Footer
     */
    setFooter(footer, img){
        for(const page of this.pages){
            page.setFooter(footer, img)
        }
        return footer
    }
    /**
     * @description Builds the embeds and sends the message
     * @returns Promise<void>
     */
    async build() {
        if(!this.options.pages) throw new TypeError(`DT Error: Missing argument pages`)

        const button_1 = new MessageButton()
        .setStyle(this.style)
        .setEmoji(this.emoji.e1)
        .setCustomId('page_next')
        const button_2 = new MessageButton()
        .setStyle(this.style)
        .setEmoji(this.emoji.e2)
        .setCustomId('page_back')
        const button_3 = new MessageButton()
        .setStyle(this.style)
        .setEmoji(this.emoji.e3)
        .setCustomId('page_delete')
        const buttons = new MessageActionRow()
        .addComponents(button_1, button_2, button_3);

        const m = await this.message.channel.send({ embeds: [this.pages[0]], components: [buttons] });

        const filter = i => i.user.id === this.message.author.id;

        const collector = this.message.channel.createMessageComponentCollector({ filter, time: this.time });

        let currentPage = 0;

        collector.on('collect', async i => {
            let req = false;
            if(i.customId === 'page_next'){
                req = true;
                if(currentPage + 1 == this.pages.length){
                    currentPage = 0;
                } else{
                    currentPage += 1;
                }
            } else if(i.customId === 'page_back'){
                req = true;
                if(currentPage - 1 < 0){
                    currentPage = this.pages.length - 1
                } else{
                    currentPage -= 1;
                }
            } else if(i.customId === 'page_delete'){
                req = true;
                return m.delete()
            }
            if(req === true){
            m.edit({ embeds: [this.pages[currentPage]], components: [buttons] }).catch(( )=>{ });
            i.deferUpdate();
            }
        })
    }
}

module.exports = pages