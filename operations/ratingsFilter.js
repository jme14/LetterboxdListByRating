const { parse } = require("csv-parse")
const fs = require("fs")
const prompt = require("prompt-sync")();

const readRatings = require("../utilities/readLetterboxdFile")
const { getNumber, getYesOrNo } = require("../utilities/betterPrompt")

const easyRank = require("../utilities/easyRank")

/* 
input: export from letterboxd transfered to array 
output: all entries between (inc) low and upper bound stay, else removed 
*/
function filterByRating(ratingsArray, lowerBound, upperBound){

    function isInRange(record){
        return (record[4] >= lowerBound && record[4] <= upperBound)
    }
    return ratingsArray.filter(isInRange)
}


function sortByRating(ratingsArray){
    return ratingsArray.sort((a,b) => b[4]-a[4])
}

function writeListFromRatingsArray(ratingsArray,listTitle){

    let allLines = [];
    allLines.push("Title,Year,URL,Description")

    for ( let i = 0 ; i < ratingsArray.length ; i++ ){
        let betterLine = `"${ratingsArray[i][1]}",${ratingsArray[i][2]},${ratingsArray[i][3]},`
        allLines.push(betterLine)
    }

    let stream = fs.createWriteStream(`./newLists/${listTitle}.csv`,)

    allLines.forEach((element)=>{
        stream.write(element+"\n")
    })

    stream.end()
}

// WRITE A LIST FILE  
// input: array of strings, filtered
// output: success or failure in writing list file 

function main(){

    const lowerBound = getNumber("What is the lowest rating allowed in this list?",0,5)
    const higherBound = getNumber("What is the highest rating allowed in this list?", lowerBound, 5)
    const title = prompt("What do you want your list to be called?\t")

    readRatings("./ratings.csv")
    .then((result) => {
        result = filterByRating(result, lowerBound, higherBound)
        result = sortByRating(result)
        console.log(result.length)

        let answer = getYesOrNo("Do you want to sort this list? y for yes, n for no")
        if ( answer === "y"){
            result = easyRank(result)
        }


        writeListFromRatingsArray(result,title)
    }).catch((error) => console.log("Termination successful"))

}

main()

