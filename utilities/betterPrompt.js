const prompt = require("prompt-sync")()

function getNumber(promptMessage, lowestAllowed, highestAllowed){

    let number = Number(prompt(promptMessage))

    if (isNaN(number)){
        number = getNumber("Not a number, try again", lowestAllowed, highestAllowed)
    }
    if ( number < lowestAllowed ){
        number = getNumber("That number is too low, try again", lowestAllowed, highestAllowed)
    } 
    if ( number > highestAllowed){
        number = getNumber("That number is too high, try again", lowestAllowed, highestAllowed)
    }

    return number
}

module.exports = getNumber
