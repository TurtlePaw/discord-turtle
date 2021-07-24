var version = require('discord.js').version.split('');
if (version.includes('(')) {
    version = version.join('').split('(').pop().split('');
}
version = parseInt(version[0] + version[1]);

if (version < 12) {
    throw new Error('The discord.js version must be v12 or higher');
}
module.exports.docs = require(`./data/v12/djs-docs`);
module.exports.timestamp = require(`./data/v13/timestamp`);
module.exports.magik = require('./data/magik');
if(version === 13){
module.exports.rps = require('./data/v13/rps');
module.exports.linkbutton = require(`./data/v13/linkbutton`);
module.exports.pages = require('./data/v13/pages');
}

//module.exports = (client) => {}