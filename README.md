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
- [Support Server](https://discord.gg/5Wutrs8s4s)

# Installation
```
$ npm i discord-turtle
```
Make sure you have `discord.js` installed!

# Examples
## Discord.js Docs
```
    const Discord = require("discord.js");
    const dt = require('discord-turtle');

    const docs = await dt.docs('MessageEmbed');
    const docsembed = new Discord.MessageEmbed(docs);
    message.channel.send(docsembed);
```
![D.js Docs Gif](https://cdn.tixte.com/uploads/turtlepaw.is-from.space/kqabjya4e9a.gif)

## Timestamps
```
const Discord = require("discord.js");
const dt = require('discord-turtle');

//Converting to timestamp
const time = await dt.timestamp(1625021700);
//Sending the time
message.channel.send(time);
```
![Timestamps Gif](https://cdn.tixte.com/uploads/turtlepaw.is-from.space/kqiw9knk59a.gif)
# **For errors and questions join [our support server](https://discord.gg/5Wutrs8s4s)**