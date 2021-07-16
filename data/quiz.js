const Discord = require('discord.js');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const get = require('axios');

class quiz {

    /**
     * @name quiz
     * @kind constructor
     * @param {Object} options options
     * @param {any} [options.message] The discord message
     * @param {String} [options.title] The embed title
     * @param {Discord.ColorResolvable} [options.color] The embed color
     * @param {String} [options.footer] The embed footer
     * @param {String} [options.losemsg] The lose message
     * @param {String} [options.winmsg] The win message
     */
    constructor(options) {
        if(!options.footer) throw new TypeError('DT Error: Missing argument footer')
        if(typeof options.footer !== 'string') throw new TypeError('DT Error: footer must be a string')

        if(!options.title) throw new TypeError('DT Error: Missing argument title')
        if(typeof options.title !== 'string') throw new TypeError('DT Error: title must be a string')

        if(!options.color) throw new TypeError('DT Error: Missing argument color')
        if(typeof options.color !== 'string') throw new TypeError('DT Error: color must be a string')

        if(!options.winmsg) throw new TypeError('DT Error: Missing argument winmsg')
        if(typeof options.winmsg !== 'string') throw new TypeError('DT Error: winmsg must be a string')
        
        if(!options.losemsg) throw new TypeError('DT Error: Missing argument losemsg')
        if(typeof options.losemsg !== 'string') throw new TypeError('DT Error: losemsg must be a string')
        
        if(!options.message) throw new TypeError('DT Error: Missing argument message')

        this.message = options.message;
        this.footer = options.footer;
        this.title = options.title;
        this.color = options.color;
        this.win = options.winmsg;
        this.lost = options.losemsg;
        this.options = options;
    }
    /**
     * Builds the embed and returns the embed
     * @returns Promise<DiscordMessageEmbed>
     */
    async build() {
        const tbody = await get('https://opentdb.com/api.php?amount=4')
        const body = tbody.data;
        let difficult = body.results[0].difficulty;
        let category = body.results[0].category;
        let question = body.results[0].question;
        let type = body.results[0].type;
        let bad = body.results[0].incorrect_answers;
        let answer = body.results[0].incorrect_answers;
        answer.push(body.results[0].correct_answer);
        const choices = ['1', '2', '3', '4'];
        const { shuffleArray } = require('./util/functions');
        answer = shuffleArray(answer);
        let correct_idx = answer.indexOf(body.results[0].correct_answer)+1
        const embed = new Discord.MessageEmbed()
            .setTitle(this.title)
            .setColor(this.color)
            .setDescription(`**${decodeURIComponent(body.results[0].question)}**\n\n` + answer.map((x, i) => `**${choices[i]} »** \`${decodeURIComponent(x)}\``).join('\n'))
            .addField('**Difficulty**', `\`${decodeURIComponent(difficult)}\``, true)
            .addField('**Quiz Genre**', `\`${decodeURIComponent(category)}\``, true)
            .addField('**Type**', `\`${decodeURIComponent(type)}\``, true)
            .setFooter(this.footer)
        return embed
    }
    /**
     * Sends the messages and waits for messages
     * Returns the first user to answer
     * @returns Promise<DiscordUser>
     */
    async start() {
    const tbody = await get('https://opentdb.com/api.php?amount=4')
    const body = tbody.data;
    let difficult = body.results[0].difficulty;
    let category = body.results[0].category;
    let question = body.results[0].question;
    let type = body.results[0].type;
    let bad = body.results[0].incorrect_answers;
    let answer = body.results[0].incorrect_answers;
    answer.push([body.results[0].correct_answer, true]);
    const choices = ['1', '2', '3', '4'];
    const { shuffleArray } = require('./util/functions');
    answer = shuffleArray(answer);
    let correct_idx = answer.indexOf(body.results[0].correct_answer)+1
    console.log(correct_idx, answer)
    const embed = new Discord.MessageEmbed()
        .setTitle(this.title)
        .setColor(this.color)
        .setDescription(`**${decodeURIComponent(body.results[0].question)}**\n\n` + answer.map((x, i) => `**${choices[i]} »** \`${decodeURIComponent(x)}\``).join('\n'))
        .addField('**Difficulty**', `\`${decodeURIComponent(difficult)}\``, true)
        .addField('**Quiz Genre**', `\`${decodeURIComponent(category)}\``, true)
        .addField('**Type**', `\`${decodeURIComponent(type)}\``, true)
        .setFooter(this.footer)
    this.message.channel.send({ embeds: [embed] });
    const filter = res => choices.includes(res.content) && res.author.id === this.message.author.id
    const reply = await this.message.channel.awaitMessages(filter, {
        max: 1,
        time: 30000
    });
    const timeremoji = '⏳'
    const no = '❎'
    const yes = '✅'
    const tada = '🎉'
    const noembed = new Discord.MessageEmbed()
    .setTitle(`Time's Up! ${timeremoji}`)
    .setDescription(this.lost)
    .addField('The correct answer was:', correct_idx.toString())
    .setColor(this.color)
    if (reply.first().content !== correct_idx.toString()) {
        this.message.channel.send({ embeds: [noembed] });
    } else if(reply.first().content === correct_idx.toString()){
        const yesembed = new Discord.MessageEmbed()
        .setTitle(`Time's Up! ${timeremoji}`)
        .setDescription(`${reply.first().author} won the game! ${yes}\nCongrats! ${tada}`)
        .addField('The correct answer was:', correct_idx.toString())
        .setColor(this.color)
        this.message.channel.send({ embeds: [yesembed] })
    }
    return reply.first().author
    }
}

module.exports = quiz;