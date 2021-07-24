const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

class gtn {
        /**
     * @name gtn
     * @kind constructor
     * @returns Promise<void>
     */
    constructor(){
        /**
        * @type {Number}
        */
        this.correctNumber = Math.floor(Math.random() * 250)
        /**
        * @type {String}
        */
        this.win = '{{user}} Won!'
        /**
         * @type {String}
         */
        this.lose = 'Maybe next time {{user}}!'
        /**
         * @type {String}
         */
        this.chances = 5
        /**
         * @type {Discord.Message}
         */
        this.message = undefined
    }
    /**
     * Set the number of chances for the game.
     * @param {Number} chances The number of chances 
     * @returns Your input
     */
    setChances(chances){
        if(!chances) throw new TypeError('DT Error: Missing argument chances')
        this.chances = chances;
        return chances
    }
    /**
     * Set the win message for the game.
     * @param {String} message The win message
     * @returns Your input
     */
    setWin(message){
        if(!message) throw new TypeError('DT Error: Missing argument message')
        this.win = message.toString();
        return message.toString()
    }
    /**
     * Set the lose message for the game.
     * @param {String} message The lose message
     * @returns Your input
     */
    setLose(message){
        if(!message) throw new TypeError('DT Error: Missing argument message')
        this.lose = message.toString()
        return message.toString()
    }
    _render(m){
        this.lose = this.lose.replace('{{user}}', m.author)
        this.win = this.win.replace('{{user}}', m.author)
    }
    /**
     * Start the game!
     * @param {Discord.Message} message The Discord message
     */
    async start(message){
        if(!message) throw new TypeError('DT Error: Missing argument message')
        this.message = message
        this._render(message)

        const m = await message.channel.send({ content: `Choose a number! (1 to 250)` });

        const mfilter = m => m.author.id === message.author.id
        const gamec = message.channel.createMessageCollector({ mfilter, time: 60000, errors: ['time'] })
        let uses = 0;
        gamec.on('collect', async m => {
            if(m.author.id !== message.author.id) return
            uses++
            if(m.content === this.correctNumber){
                message.channel.send({ content: this.win });
                return gamec.stop()
            } else {
                if(uses > this.chances-1){
                    message.channel.send({ content: this.lose });
                    return gamec.stop()
                } else {
                    message.channel.send({ content: 'Wrong - Try again!' });
                }
            }
        })
        gamec.on('end', async r => {
            if(r === 'time'){

            }
        })
    }
    //Stuff
}

module.exports = gtn