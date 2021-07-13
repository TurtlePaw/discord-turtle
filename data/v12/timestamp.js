module.exports = async (time) => {
    if(!time) throw new TypeError('DT Error: Missing argument time ( Must be UNIX )')

    const req = '<t:' + time + ':R>';
    return req
}