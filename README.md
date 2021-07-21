> Discord Turtle is a package that can do lots of stuff, like embed pages!
<div align="center">
  <p>
    <a href="https://nodei.co/npm/discord-turtle
/"><img src="https://nodei.co/npm/discord-turtle.png?downloads=true&stars=true" alt="NPM Info" /></a>
  </p>
</div>

<div align="center">
 <p>For errors and questions join <a href="https://discord.gg/5Wutrs8s4s">our support server</a></p>
</div>

## Table Of Content

- [Installation](#installation)
- [Examples](#examples)
- [Discord.js Docs](#discordjs-docs)
- [Timestamps](#Timestamps)
- [Links](#link)
- [Magik](#magik)
- [Pages](#pages)
- [RPS](#rps)
- [Support Server](https://discord.gg/5Wutrs8s4s)

# Installation
```
$ npm i discord-turtle
```
Make sure you have `discord.js` installed!

> To install discord V13 do `npm i discord.js@dev`

# Examples
## Discord.js Docs
```js
    const Discord = require("discord.js");
    const dt = require('discord-turtle');

    const docs = await dt.docs('MessageEmbed');
    const docsembed = new Discord.MessageEmbed(docs);
    message.channel.send(docsembed);
```
![D.js Docs Gif](https://cdn.tixte.com/uploads/turtlepaw.is-from.space/kqabjya4e9a.gif)

## Timestamps
```js
const Discord = require("discord.js");
const dt = require('discord-turtle');

//Converting to timestamp
const time = await dt.timestamp(1625021700);
//Sending the time
message.channel.send(time);
```
![Timestamps Gif](https://cdn.tixte.com/uploads/turtlepaw.is-from.space/kqiw9knk59a.gif)
## Link
__You must be on Discord.js V13__
```js
new dt.linkbutton({
    link: 'https://discord.com',
    label: 'Discord.com'
}).create().then(button => {
   <channel>.send({ content: 'Hey!', components: [[button]] })
})
```
![Link Buttons](https://cdn.tixte.com/uploads/turtlepaw.is-from.space/kr5kr47b99a.png)
## Magik
```js
const dt = require('discord-turtle');
new dt.magik({
    mentions: <message>.mentions,
    author: <message>.author
}).create().then(button => {
    <channel>.send({ embeds: [button.embed.setColor('BLURPLE')] })
})
```
![Magik](https://cdn.tixte.com/uploads/turtlepaw.is-from.space/kr5kse1vx9a.png)
## Pages
__You must be on Discord.js V13__
```js
const Discord = require("discord.js");
const dt = require('discord-turtle');
const page_1 = new Discord.MessageEmbed()
.setTitle('Page 1')
const page_2 = new Discord.MessageEmbed()
.setTitle('Page 2')
new dt.pages({
    pages: [page_1, page_2],
    emoji: ['emojiid', 'emojiid', 'emojiid'],
    message: message,
    style: 'SECONDARY'
}).build();
```
![Pages](https://cdn.tixte.com/uploads/turtlepaw.is-from.space/kr5kkhrz19a.gif)
## RPS
__You must be on Discord.js V13__
```js
const dt = require('discord-turtle');

const rpsgame = new dt.rps();
rpsgame.setMessage(message)
rpsgame.start();
```
![RPS](https://cdn.tixte.com/uploads/turtlepaw.is-from.space/krcqn39yr9a.gif)
# **For errors and questions join [our support server](https://discord.gg/5Wutrs8s4s)**