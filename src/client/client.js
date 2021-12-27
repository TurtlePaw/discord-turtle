const Discord = require("discord.js");
const TurtleAPI = require("../turtles");
const EventEmitter = require("node:events");

class TurtleClient extends EventEmitter {
    /**
     * The options for creating a turtle client.
     * @typedef TurtleOptions
     * @property {Discord.Webhook} [webhook=null] 
     */
    /**
     * The options for creating a turtle client.
     * @param {TurtleOptions} options
     */
    constructor({ webhook = null, color = null } = {}) {
        super();

        /**
         * The webhook used to send turtles.
         * @type {Discord.Webhook}
         */
        this.webhook = webhook;

        /**
         * The color used for the webhook message.
         * @type {Discord.ColorResolvable}
         */
        this.color = color;
    }

    /**
     * Sets the webhook used to send turtles.
     * @param {Discord.Webhook} wh
     * @returns {TurtleClient}
     */
    setWebhook(wh) {
        if(typeof wh == "string") wh = new Discord.WebhookClient({ url: wh });
        this.webhook = wh
        return this;
    }

    /**
     * Sets the color on the embed used to send turtles.
     * @param {Discord.ColorResolvable} cl
     * @returns {TurtleClient}
     */
    setColor(cl) {
        this.color = cl
        return this;
    }

    /**
     * @private
     */
    _renderEmbed() {
        const Find = TurtleAPI.random();
        return {
            embeds: [
                new Discord.MessageEmbed()
                    .setColor(this.color)
                    .setImage(Find)
                    .setTitle("🐢 Time for a turtle!")
                    .setURL(Find)
            ]
        }
    }
    /**
     * Starts the client.
     * @param {Number} time The interval time used on the `setInterval` function.
     */
    async init(time) {
        try{
            const m = await this.webhook.send(this._renderEmbed());
            this.emit("send", m);
        } catch(e){
            this.emit("error", e);
        }

        setInterval(async () => {
            try{
                const m = await this.webhook.send(this._renderEmbed());
                this.emit("send", m);
            } catch(e){
                this.emit("error", e);
            }
        }, time);
    }
}

module.exports = TurtleClient;