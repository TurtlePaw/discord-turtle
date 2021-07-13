const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = async (query, source) => {
    if (!query) throw new TypeError('DT Error: Missing argument query')
    const q = encodeURIComponent(query.toString());
    const tsource =  source || 'stable';
    const tstr = 'https://djsdocs.sorta.moe/v1/main/' + tsource + '/embed?q=' + q;
    const res = await fetch(tstr);
    const tembed = await res.json();
    const docs = new Discord.MessageEmbed()
    .setAuthor(`${tembed.author?.name}`, `${tembed.author?.icon_url}`, `${tembed.author?.url}`)
    .setTitle(`Search results:`)
    .setDescription(tembed?.description)
    .setColor('BLUE')
    return docs;
}