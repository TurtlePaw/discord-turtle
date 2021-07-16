const { warntypes } = require('./util');

    /**
     * @param {warntypes} [error] The error
     * @param {String} [arg] The arg
     */
    
module.exports.warn = async (error, arg) => {
    if(error === 'arg'){
    throw new TypeError(`DT Error: Missing argument ${arg}`)
    } else if(error === 'string'){
        throw new TypeError(`DT Error: ${arg} must be a string`)
    }
}