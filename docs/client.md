# Turtle Client
Discord webhook client that sends a [random](/docs/turtle-api?id=random) turtle every so often.

## Methods
### .setWebhook
Sets the webhook of the client.

PARAMETER | TYPE | OPTIONAL | DEFAULT | DESCRIPTION
------ | ------ | ------ | ------ | ------
wh | String | false | None | The webhook URL used to send turtles.

```js
.setWebhook("https://discord.com/api/webhooks/id/token")
```

### .setColor
Sets the color of the webhook embeds.

PARAMETER | TYPE | OPTIONAL | DEFAULT | DESCRIPTION
------ | ------ | ------ | ------ | ------
cl | [Discord.ColorResolvable](https://discord.js.org/#/docs/main/stable/typedef/ColorResolvable) | false | None | The color used on the embeds.

```js
.setColor("GREEN") //Green for turtles
```

### .init
Starts the client webhooks.

```js
await TurtleClient.init();
```
