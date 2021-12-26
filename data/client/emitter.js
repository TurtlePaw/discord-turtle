const { EventEmitter } = require('events');
const emitter = new EventEmitter();

class Emitter {
    /**
     * Listens to the event.
     * @param {*} event Event name.
     * @param {Function} fn fn Callback function.
     * @returns {Emitter} Emitter.
     */
    on(event, fn) {
        return emitter.on(event, fn)
    }
    /**
     * Listens to the event.
     * @param {*} event Event name.
     * @param {Function} fn fn Callback function.
     * @returns {Emitter} Emitter.
     */
    once(event, fn){ 
        return emitter.once(event, fn)
    }
    /**
     * Emits the event.
     * @param {*} event Event name. 
     * @param {any} data Any data to send. 
     * @returns {Boolean} If emitted: true; else: false.
     */
    emit(event, data) { 
        return emitter.emit(event, data)
    }
}

module.exports = Emitter