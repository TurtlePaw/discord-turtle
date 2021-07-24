const Discord = require('discord.js');

class rps {
    constructor(){
        this.emojis = {
            rock: '🪨',
            paper: '📄',
            scissors: '✂️'
        }
        this.win = '{{user}} won the game!'
        this.lost = 'Maybe next time {{user}}! :('
        this.loadm = 'Thinking...'
        this.style = 'SECONDARY'
        this.tie = 'It\'s a tie!'
        this.message = undefined;
    }
    /**
     * Set the win message
     * @param {String} data The message
     */
    setWin(data) {
        if(!data) throw new TypeError('DT Error: Missing arguments data')
        this.win = data.toString()
    }
    /**
     * Set the button style
     * @param {Discord.MessageButtonStyle} style The style
     */
    setStyle(style){
        if(!style) throw new TypeError('DT Error: Missing argument style')
        this.style = style;
    }
    /**
     * Set the lost message
     * @param {String} data The message
     */
    setLost(data){
        if(!data) throw new TypeError('DT Error: Missing arguments data')
        this.lost = data.toString()
    }
    /**
     * Set the command message
     * @param {Discord.Message} message The Discord message
     */
    setMessage(message){
        if(!message) throw new TypeError('DT Error: Missing arguments message')
        if(typeof message !== 'object') throw new TypeError('DT Error: message must be an object')
        this.message = message;
    }
    /**
     * Set the loading message for the game!
     * @param {String} data The message
     */
    setLoading(data){
        if(!data) throw new TypeError('DT Error: Missing arguments data')
        this.loadm = data.toString()
    }
    /**
     * Set the emojis for the game!
     * @example
       <rps>.setEmojis({
       rock: '🪨',
       paper: '📄',
       scissors: '✂️'
      })
     * @param {Object} data The emojis
     */
    setEmojis(data){
        if(!data) throw new TypeError('DT Error: Missing arguments data')
        if(typeof data !== 'object') throw new TypeError('DT Error: Data must be an object')
        this.emojis = data
    }
    /**
     * Set the tie message for the game!
     * @param {String} data The tie message
     */
    setTie(data){
        if(!data) throw new TypeError('DT Error: Missing arguments data')
        this.tie = data.toString()
    }
    _render(){
        this.win = this.win.replace('{{user}}', this.message.author)
        this.lost = this.lost.replace('{{user}}', this.message.author)
    }
    _checkWinner(one, two){
                    if (
                        (two === 'scissors' && one === 'paper') ||
                        (two === 'rock' && one === 'scissors') ||
                        (two === 'paper' && one === 'rock')
                    ) {
                        return {
                            author_won: false,
                            ai_won: true
                        }
                    } else if(one === two){
                        return {
                            tie: true
                        }
                    } else {
                        return {
                            author_won: true,
                            ai_won: false
                        }
                    }
    }
    /**
     * Start the game!
     */
    async start(){
        if(!this.message) throw new TypeError('DT Error: Missing arguments message')
        this._render();
        const message = this.message;
        const rpsopt = ['rock', 'paper', 'scissors'];
        const m = await message.channel.send({ content: this.loadm });
        const correct_a = rpsopt[Math.floor(Math.random() * rpsopt.length)]
        const b1 = new Discord.MessageButton()
        .setCustomId('rock')
        .setLabel(`Rock`)
        .setStyle(this.style)
        .setEmoji(this.emojis.rock)
        const b2 = new Discord.MessageButton()
        .setCustomId('paper')
        .setLabel(`Paper`)
        .setStyle(this.style)
        .setEmoji(this.emojis.paper)
        const b3 = new Discord.MessageButton()
        .setCustomId('scissors')
        .setLabel(`Scissors`)
        .setStyle(this.style)
        .setEmoji(this.emojis.scissors)
        const baction_row = new Discord.MessageActionRow()
        .addComponents(
            b1, b2, b3
        )
        const disbaction_row = new Discord.MessageActionRow()
        .addComponents(
            b1.setDisabled(true), b2.setDisabled(true), b3.setDisabled(true)
        )
        const ENDED_EMBED = new Discord.MessageEmbed()
        .setTitle('Time has ended!')
        .setColor('RED')
        m.edit({ content: 'Choose your sign!', components: [baction_row] });
        const filter = i => i.user.id = message.author.id;
        let won;
        let tie;
        m.awaitMessageComponent({ filter, time: 60000 })
        .then(async i => {
            m.edit({ content: `${message.author} Chooses ${require('../util/functions').fixCase(i.customId)}\nI choose ${require('../util/functions').fixCase(correct_a)}`, components: [] })
            const correct_c = this._checkWinner(i.customId, correct_a);
            if(correct_c.author_won === true){
                i.reply({ content: this.win, components: [] });
                won = true
            } else if(correct_c.tie === true){
                i.reply({ content: this.tie, components: [] });
                tie = true
            } else {
                i.reply({ content: this.lost, components: [] });
                won = false
            }
        }).catch(( )=>{ m.edit({ embeds: [ENDED_EMBED], components: [] })})
        return {
            won: won,
            tie: tie,
            user: message.author
        }
    }
}

module.exports = rps