const Discord = require('discord.js');

class buttonRole {
    /**
     * 
     * @param {Object} options 
     * @param {Discord.Guild} [options.guild]
     * @param {Discord.Role[]} [options.roles]
     * @param {Discord.Client} [options.client]
     */
    constructor(options){
       this.guild = options.guild
       this.roles = options.roles
       this.client = options.client
       this.embed = new Discord.MessageEmbed().setColor(require('../../colors.json').discord_embed)
       .setTitle(`Roles`)
       .setDescription(`Use the buttons below to get roles!`)
       options.client.on('interaction', async interaction => {
           if(!interaction.isButton()) return
           if(this.roles.find(e => e.id === interaction.customId).id === interaction.customId){
                const role = this.guild.roles.cache.get(interaction.customId);
                if(interaction.member.roles.cache.has(role.id)){
                    interaction.member.roles.remove(role.id)
                    interaction.reply({ content: `Removed the ${role} role!`, ephemeral: true });
                } else {
                    interaction.member.roles.add(role.id)
                    interaction.reply({ content: `Gave you the ${role} role!`, ephemeral: true });
                }
           }
       })
    }
    addRoles(roles){
        if(!roles) throw new TypeError('DT Error: Missing arg roles')
        this.roles.push(roles)
    }
    _render(){
        const actionrows = new Array(new Discord.MessageActionRow());
        let i = 0;
        let i2 = 0;
        for(const role of this.roles){
            if(i > 4){
                i2++
                actionrows.push(new Discord.MessageActionRow())
            }
            actionrows[i2].addComponents(
                new Discord.MessageButton()
                .setLabel(role.name)
                .setStyle('SECONDARY')
                .setCustomId(role.id)
            )
        }
        return actionrows
    }
    /**
     * 
     * @param {Discord.Message} message 
     */
    async send(message, embed=this.embed){
        if(!message) throw new TypeError('DT Error: Missing arg message')
        const rows = this._render();
        const m = await message.channel.send({ embeds: [embed], components: rows });
    }    
}

module.exports = buttonRole;