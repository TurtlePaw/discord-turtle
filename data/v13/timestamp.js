const Discord = require('discord.js');
class timestamp {
    constructor(){
        this.time = new Date()
        this.style = null
    }
    /**
     * Set the time for the timestamp.
     * @param {Number|Date} time The time.
     */
    setTime(time){
        if(!time) throw new TypeError('DT Error: Missing argument time')
        if(typeof time !== 'number') throw new TypeError('DT Error: time must be a number')
        this.time = time;
    }
    /**
     * Set the style for the timestamp.
     * @param {'NONE'|'T'|'t'|'d'|'D'|'f'|'F'|'R'} style The style. 
     */
    setStyle(style) {
        if(!style) throw new TypeError('DT Error: Missing argument style')
        if(typeof style !== 'string') throw new TypeError('DT Error: style must be a string')
        this.style = style.toString()
    }
    _render(){
        this.time = Math.round(new Date(this.time)/1000)
        if(this.style){
            if(this.style === 'NONE'){
                this.time = '<t:' + this.time + '>'
            } else {
                this.time = '<t:' + this.time + `:${this.style}>`
            }
        }
    }
    /**
     * Render the timestamp to discord timestamps
     * @returns The timestamp
     */
    toTimestamp(){
        this._render()
        return this.time
    }
}

module.exports = timestamp