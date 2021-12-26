const Discord = require('discord.js')

class captcha {
    /**
     * 
     * @param {Object} emojis 
     * @param {String} [emojis.checkmark]
     * @param {String} [emojis.xmark]
     */
    constructor(emojis){
        /**
         * The embed to use.
         * @type {Discord.MessageEmbed}
         */
        this.embed = new Discord.MessageEmbed();
        /**
         * The style for the button.
         * @type {Discord.MessageButtonStyle}
         */
        this.buttonStyle = "SECONDARY"
        /**
         * The label for the button.
         * @type {String}
         */
        this.buttonLabel = "Verify"
        /**
         * The emoji for the button.
         * @type {String}
         */
        this.buttonEmoji = '✅'
        /**
         * The button.
         * @type {Discord.MessageButton}
         */
        this.button = new Discord.MessageButton();
        /**
         * The role for the verify.
         * @type {Discord.Role}
         */
        this.verifyRole = null
        /**
         * @private
         * @type {String}
         */
        this.buttonID_NUMBER = require('../util/functions').getRandomNumber(5, 10)
        /**
         * @private
         * @readonly
         * @type {String}
         */
        this.buttonID = 'ver_button' + '_' + this.buttonID_NUMBER
        /**
         * Checkmark emoji
         * @private
         * @type {String}
         */
        this.checkmarkEmoji = emojis?.checkmark || '✅'
        /**
         * Xmark emoji.
         * @private
         * @type {String}
         */
        this.xmarkEmoji = emojis?.xmark || '❌'
        /**
         * The embed color.
         * @type {Discord.ColorResolvable}
         */
        this.color = "BLURPLE"
        /**
         * The image emoji for the 2nd button.
         * @type {String}
         */
        this.imageEmoji = '🖼️'
        /**
         * The messages to say if the answer is right or wrong.
         */
        this.messages = {
            correct: `${this.checkmarkEmoji} Correct answer!`,
            incorrect: `${this.xmarkEmoji} Incorrect answer!`
        }
    }

    /**
     * Edit the embed options.
     * @param {Object} options 
     * @param {Discord.ColorResolvable} [options.color]
     * @param {String} [options.title]
     * @param {String} [options.description]
     * @param {String} [options.footer]
     * @param {String} [options.author]
     * @returns {Discord.MessageEmbed}
     */
    setVerifyEmbed(options){
        this.embed.setAuthor(options.author)
        this.embed.setFooter(options.footer)
        this.embed.setTitle(options.title)
        this.embed.setDescription(options.description)
        this.embed.setColor(options.color)

        if(options.color){
            this.color = options.color
        }

        return this.embed
    }

    /**
     * Set the role for the verify.
     * @param {Discord.Role} role 
     * @returns {Discord.Role}
     */
    setRole(role){
        return this.verifyRole = role
    }

    /**
     * Set the messages for if the captcha answer is right or wrong.
     * @param {String} correct 
     * @param {String} incorrect 
     * @returns {String}
     */
    setMessages(correct, incorrect){
        return this.messages = {
            correct: correct,
            incorrect: incorrect
        }
    }
    /**
     * Set the embed.
     * @param {Discord.MessageEmbed} embed The embed.
     * @returns {Discord.MessageEmbed}
     */
    setEmbed(embed){
        if(embed instanceof Discord.MessageEmbed) throw new TypeError(`DT Error: Embed must be a Discord.js MessageEmbed`)
        this.embed = embed
        return this.embed
    }

    /**
     * Set the button style.
     * @param {Discord.MessageButtonStyle} style The style.
     * @returns {Discord.MessageButtonStyle}
     */
    setStyle(style){
        return this.buttonStyle = style
    }

    /**
     * Set the button label.
     * @param {String} label
     * @returns {String}
     */
    setLabel(label){
        return this.buttonLabel = label
    }

    /**
     * Set the button emoji.
     * @param {String} emoji (Emoji ID)
     * @returns {String}
     */
    setEmoji(emoji){
        return this.buttonEmoji = emoji
    }

    /**
     * Set the image emoji for the 2nd button.
     * @param {String} emoji 
     * @returns {String}
     */
    setImageEmoji(emoji){
        return this.imageEmoji = emoji
    }

    /**
     * @private
     */
    _renderButton(){
        const button = this.button;

        button.setEmoji(this.buttonEmoji)
        button.setLabel(this.buttonLabel)
        button.setStyle(this.buttonStyle)
        button.setCustomId(this.buttonID)

        const embed = this.embed;

        if(!this.embed.description){
            embed.setDescription(`Use the button below to get verifed!`)
            .setFooter(`By clicking the button you agree to being DMed.`)
            .setTimestamp()
            .setTitle(`${this.checkmarkEmoji} Verifing`)
            
            this.embed = embed
        }
    }

    /**
     * Send the message.
     * @param {Discord.TextChannel} channel 
     * @param {Discord.Client} client
     * @param {Object} options
     * @param {Boolean} [options.kickUsers]
     */
    async send(channel, client, options={}){
        const timestamps = require('./timestamp');

        this._renderButton();

        this.embed.setColor(this.color)

        const button2Send = new Discord.MessageActionRow().addComponents(this.button)
        const m = await channel.send({ embeds: [this.embed], components: [button2Send] })

        client.on('interactionCreate', async interaction => {
            if(!interaction.isButton()) return

            if(interaction.customId === this.buttonID){
                interaction.reply({ content: `${this.checkmarkEmoji} Sent you a DM!`, ephemeral: true });

                //interaction.member.createDM(true) //I don't think this is needed...

                const bembed = new Discord.MessageEmbed()
                .setColor(this.color)

                const button = new Discord.MessageButton()
                .setCustomId(`image_captcha`)
                .setLabel(`${this.imageEmoji.length > 1 ? '' : this.imageEmoji} Image captcha`)
                .setStyle(this.buttonStyle)


                if(this.imageEmoji.length > 1){
                    button.setEmoji(this.imageEmoji)
                }
                const button2send = new Discord.MessageActionRow().addComponents(button)
                /**
                 * @type {Discord.Message}
                 */
                const dm = await interaction.member.send({ embeds: [this.embed], components: [button2send] })

                await dm.awaitMessageComponent({ time: 600000, filter: i=>'.'==='.' }).then(async i => {
                    
                    const captcha = await require('./createCaptcha')()
                    const cmessage = captcha.text

                    //console.log(cmessage)
                    const ms = require('ms')
                    const t60s = ms('60s');

                    const timestamp = new timestamps()
                    timestamp.setStyle('R')
                    timestamp.setTime(Date.now()+t60s)
                    
                    const caembed = bembed.setImage('attachment://captcha.png')
                    .setDescription(`You have ${timestamp.toTimestamp()} ||(60s)|| to answer this${options.kickUsers ? ", if you get the answer wrong then you will be kicked! But you can always rejoin." : "."}`)
                    i.reply({ embeds: [caembed], files: [
                        { name: "captcha.png", attachment: captcha.image }
                    ] });
                    const linkButton = new Discord.MessageButton()
                    .setLabel(`${this.imageEmoji.length > 1 ? '' : this.imageEmoji} Image captcha`)
                    .setStyle('LINK')
                    .setURL(`https://discord.com/channels/@me/${(await i.fetchReply()).channel.id}/${(await i.fetchReply()).id}`)
                    if(this.imageEmoji.length > 1){
                        linkButton.setEmoji(this.imageEmoji)
                    }
                    const buttonDisabled = new Discord.MessageActionRow().addComponents(linkButton)
                    dm.edit({ components: [buttonDisabled] })

                    i.channel.awaitMessages({ time: 60, max: 1, filter: i=>i.author.id!==client.user.id&&i.author.id===interaction.member.id, errors: ['time'] }).then(async mc => {
                        const message = mc.first();

                        const cembed = bembed.setDescription(this.messages.correct)
                        const iembed = bembed.setDescription(this.messages.incorrect)
                        if(message.content === cmessage){
                            i.channel.send({ embeds: [cembed] })
                            
                            interaction.member.roles.add(this.verifyRole.id)
                        } else {
                            i.channel.send({ embeds: [iembed] })
                        }
                    })
                })
            }
        })
    }
}

module.exports = captcha