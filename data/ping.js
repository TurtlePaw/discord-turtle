const Discord = require('discord.js')

module.exports = async (client, message, dev) => {
    if (!client) throw new TypeError('Error: client')
    if (!message) throw new TypeError('Error: message')
    console.log(dev);
    if (dev === true) {
        message.channel.send({ content: `🏓 Pinging....` }).then((msg) => {
            const _ = new Discord.MessageEmbed()
                .setTitle("Pong!")
                .setDescription(
                    `🏓 Pong!\nLatency is ${Math.floor(
                        msg.createdTimestamp - message.createdTimestamp
                    )}ms\nAPI Latency is ${Math.round(message.client.ws.ping)}ms`
                )
                .setColor("RANDOM");
            msg.edit({ content: "\u200B" });
            msg.edit({ embeds: [_] });
        })
    } else {
        message.channel.send(`🏓 Pinging....`).then((msg) => {
            const _ = new Discord.MessageEmbed()
                .setTitle("Pong!")
                .setDescription(
                    `🏓 Pong!\nLatency is ${Math.floor(
                        msg.createdTimestamp - message.createdTimestamp
                    )}ms\nAPI Latency is ${Math.round(message.client.ws.ping)}ms`
                )
                .setColor("RANDOM");
            msg.edit("\u200B");
            setTimeout(() => {
                msg.edit(_);
            }, 100);
        });
    }
}