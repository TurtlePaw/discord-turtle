const Turtles = require("./turtles.json");

module.exports.raw = Turtles;
/**
 * Finds a random turtle and returns the URL.
 * @returns {String} URL
 */
module.exports.random = () => {
    return Turtles[Math.round(Math.random() * Turtles.length-1)]
}