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

function getYesOrNo(promptMessage){
    let answer = prompt(promptMessage)

    if ( answer !== "n" && answer !== "y" && answer !== "b" && answer !== "quit" && answer !== "1" && answer !== "2"){
        answer = getYesOrNo("Enter y for yes or n for no")
    }

    if ( answer === "quit"){
        throw new Error("STOP THE PROGRAM!!!")
    }

    if ( answer === "1") answer = "y"
    if ( answer === "2") answer = "n"

    return answer 
}

module.exports = { getNumber, getYesOrNo }
