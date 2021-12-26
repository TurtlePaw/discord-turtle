const Events = require('events')

class client extends Events {
    constructor(){
        this.ready
    }

    get emojis() {
        return {
            /**
             * 
             * @param {String} text 
             * @returns 
             */
            extract: function(text) {
                const data = {
                    animated: text.startsWith('<a:'),
                    name: text.slice(text.indexOf(':'), text.lastIndexOf(':')),
                    id: text.slice(text.lastIndexOf(':'), text.lastIndexOf('>')),
                    toString: function() { return `<${ data.animated ? 'a:' : ''}:${data.name}:${data.id}>`}
                }
                return data
            }

        }
    }
}