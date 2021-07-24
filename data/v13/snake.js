const Discord = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');

class snake {
    constructor(){
        this.emojis = {
            empty: '⬛',
            snakeBody: '🟩',
            food: '🍎',
            up: '⬆️',
            right: '⬅️',
            down: '⬇️',
            left: '➡️', 
        }
        this.buttonText = 'Cancel'
        this.message = undefined
        this.embed = {
                title: 'Snake!',
                description: 'GG, you scored **{{score}}** points!',
                color: '#7289da',
        }
    }

    /**
     * 
     * @param {Discord.Message} message 
     */
    setMessage(message) {
        this.message = message
    }
    async start() {
        var options = this
        let score = 0;
        const width = 15;
        const height = 10;
        const gameBoard = [];
        let inGame = false;
        let snakeLength = 1;
        const apple = { x: 0, y: 0 };
        let snake = [{ x: 0, y: 0 }];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                gameBoard[y * width + x] = options.emojis.empty;
            }
        }
    
        function gameBoardToString() {
            let str = '';
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    if (x == apple.x && y == apple.y) {
                        str += options.emojis.food;
                        continue;
                    }
                    let flag = true;
                    for (let s = 0; s < snake.length; s++) {
                        if (x == snake[s].x && y == snake[s].y) {
                            str += options.emojis.snakeBody;
                            flag = false;
                        }
                    }
                    if (flag) {
                        str += gameBoard[y * width + x];
                    }
                }
                str += '\n';
            }
            return str;
        }
    
        function isLocInSnake(pos) {
            return snake.find((sPos) => sPos.x == pos.x && sPos.y == pos.y);
        }
    
        function newappleLoc() {
            let newapplePos = {
                x: 0,
                y: 0,
            };
            do {
                newapplePos = {
                    x: parseInt(Math.random() * width),
                    y: parseInt(Math.random() * height),
                };
            } while (isLocInSnake(newapplePos));
            apple.x = newapplePos.x;
            apple.y = newapplePos.y;
        }
    
        function step(msg) {
            if (apple.x == snake[0].x && apple.y == snake[0].y) {
                score += 1;
                snakeLength++;
                newappleLoc();
            }
    
            const editEmbed = new Discord.MessageEmbed()
                .setColor(options.embed.color)
                .setTitle(options.embed.title)
                .setDescription(gameBoardToString())
                .setTimestamp();
            lock1 = new MessageButton()
                .setLabel('\u200b')
                .setStyle('SECONDARY')
                .setCustomId('lock1')
                .setDisabled(true)
            w = new MessageButton()
                .setEmoji(options.emojis.up)
                .setStyle('SECONDARY')
                .setCustomId('w');
            lock2 = new MessageButton()
                .setLabel('\u200b')
                .setStyle('SECONDARY')
                .setCustomId('lock2')
                .setDisabled(true)
            a = new MessageButton()
                .setEmoji(options.emojis.right)
                .setStyle('SECONDARY')
                .setCustomId('a');
            s = new MessageButton()
                .setEmoji(options.emojis.down)
                .setStyle('SECONDARY')
                .setCustomId('s');
            d = new MessageButton()
                .setEmoji(options.emojis.left)
                .setStyle('SECONDARY')
                .setCustomId('d');
            stopGame = new MessageButton()
                .setLabel(options.buttonText)
                .setStyle('DANGER')
                .setCustomId('stop');
                row1 = new MessageActionRow().addComponents(lock1, w, lock2, stopGame)
                row2 = new MessageActionRow().addComponents(a, s, d)
            options.message.edit({
                embeds: [editEmbed],
                components: [row1, row2],
            });
        }
    
        function gameOver(m) {
            lock1 = new MessageButton()
                .setLabel('\u200b')
                .setStyle('SECONDARY')
                .setCustomId('lock1')
                .setDisabled(true)
            w = new MessageButton()
                .setEmoji(options.emojis.up)
                .setStyle('SECONDARY')
                .setCustomId('w')
                .setDisabled(true)
            lock2 = new MessageButton()
                .setLabel('\u200b')
                .setStyle('SECONDARY')
                .setCustomId('lock2')
                .setDisabled(true)
            a = new MessageButton()
                .setEmoji(options.emojis.right)
                .setStyle('SECONDARY')
                .setCustomId('a')
                .setDisabled(true)
            s = new MessageButton()
                .setEmoji(options.emojis.down)
                .setStyle('SECONDARY')
                .setDisabled(true)
                .setCustomId('s');
            d = new MessageButton()
                .setEmoji(options.emojis.left)
                .setStyle('SECONDARY')
                .setDisabled(true)
                .setCustomId('d');
            stopGame = new MessageButton()
                .setLabel(options.buttonText)
                .setStyle('DANGER')
                .setCustomId('stop')
                .setDisabled(true)
                row1 = new MessageActionRow().addComponents(lock1, w, lock2, stopGame)
                row2 = new MessageActionRow().addComponents(a, s, d)
            inGame = false;
    
            const editEmbed = new Discord.MessageEmbed()
                .setColor(options.embed.color)
                .setTitle(options.embed.title)
                .setDescription(options.embed.description.replace('{{score}}', score))
                .setTimestamp();
    
            m.edit({
                embeds: [editEmbed],
                components: [row1, row2],
            });
        }
    
        if (inGame) return;
        inGame = true;
        score = 0;
        snakeLength = 1;
        snake = [{ x: 5, y: 5 }];
        newappleLoc();
        const embed = new Discord.MessageEmbed()
        .setColor(options.embed.color)
        .setTitle(options.embed.title)
            .setDescription(gameBoardToString())
            .setTimestamp();
    
            let lock1 = new MessageButton()
                .setLabel('\u200b')
                .setStyle('SECONDARY')
                .setCustomId('lock1')
                .setDisabled(false)
                let w = new MessageButton()
                .setEmoji(options.emojis.up)
                .setStyle('SECONDARY')
                .setCustomId('w')
                .setDisabled(false)
                let lock2 = new MessageButton()
                .setLabel('\u200b')
                .setStyle('SECONDARY')
                .setCustomId('lock2')
                .setDisabled(false)
                let a = new MessageButton()
                .setEmoji(options.emojis.right)
                .setStyle('SECONDARY')
                .setCustomId('a')
                .setDisabled(false)
                let s = new MessageButton()
                .setEmoji(options.emojis.down)
                .setStyle('SECONDARY')
                .setDisabled(false)
                .setCustomId('s');
                let d = new MessageButton()
                .setEmoji(options.emojis.left)
                .setStyle('SECONDARY')
                .setDisabled(false)
                .setCustomId('d');
            let stopGame = new MessageButton()
                .setLabel(options.buttonText)
                .setStyle('DANGER')
                .setCustomId('stop')
                .setDisabled(false)
                
                let row1 = new MessageActionRow().addComponents(lock1, w, lock2, stopGame)
                let row2 = new MessageActionRow().addComponents(a, s, d)
        options.message.channel.send({ embeds: [embed] }).then(async (m) => {
            m.edit({
                embeds: [embed],
                components: [row1, row2],
            });
            const collector = m.createMessageComponentCollector({ filter: (i) => i.user.id === options.message.author.id, time: 60000 });
            collector.on('collect', async (btn) => {
                btn.deferUpdate();
                const snakeHead = snake[0];
                const nextPos = {
                    x: snakeHead.x,
                    y: snakeHead.y,
                };
                if (btn.id === 'a') {
                    let nextX = snakeHead.x - 1;
                    if (nextX < 0) {
                        nextX = width - 1;
                    }
                    nextPos.x = nextX;
                } else if (btn.id === 'w') {
                    let nextY = snakeHead.y - 1;
                    if (nextY < 0) {
                        nextY = height - 1;
                    }
                    nextPos.y = nextY;
                } else if (btn.id === 's') {
                    let nextY = snakeHead.y + 1;
                    if (nextY >= height) {
                        nextY = 0;
                    }
                    nextPos.y = nextY;
                } else if (btn.id === 'd') {
                    let nextX = snakeHead.x + 1;
                    if (nextX >= width) {
                        nextX = 0;
                    }
                    nextPos.x = nextX;
                } else if (btn.id === 'stop') {
                    gameOver(m);
                    collector.stop();
                }
    
                if (isLocInSnake(nextPos)) {
                    gameOver(m);
                    collector.stop();
                } else {
                    snake.unshift(nextPos);
                    if (snake.length > snakeLength) {
                        snake.pop();
                    }
                    step(m);
                }
            });
        });  
    }
}