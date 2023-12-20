const { parse } = require("csv-parse")
const fs = require("fs")
const prompt = require("prompt-sync")();

function readWatchedFile(fileLocation){

    return new Promise( (resolve, reject) => {
        let watchedData = [];

        fs.createReadStream(fileLocation)
        .pipe(parse({delimiter: ",", from_line: 2}))
        .on("data", (row) => {
            watchedData.push(row)
        })
        .on("end", () => {
            resolve(watchedData)
        })
        .on("error", (error) => reject(error))

    })

}
// READ THE WATCHED FILE 
// input: file location 
// output: an array of strings corresponding to each line of the file 


function filterByRating(ratingsArray, lowerBound, upperBound){

    function isInRange(record){
        return (record[4] >= lowerBound && record[4] <= upperBound)
    }
    return ratingsArray.filter(isInRange)
}
// FILTER THE ARRAY THROUGH RATING 
// input: an array of strings corresponding to the "watched" section 
// input: the lower rating end 
// input: the higher rating end 
// output: an array of strings only  

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

    let stream = fs.createWriteStream(`${listTitle}.csv`,)

    allLines.forEach((element)=>{
        stream.write(element+"\n")
    })

    stream.end()
}

// WRITE A LIST FILE  
// input: array of strings, filtered
// output: success or failure in writing list file 

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

function main(){

    const lowerBound = getNumber("What is the lowest rating allowed in this list?",0,5)
    const higherBound = getNumber("What is the highest rating allowed in this list?", lowerBound, 5)
    const title = prompt("What do you want your list to be called?\t")

    readWatchedFile("./ratings.csv")
    .then((result) => {
        result = filterByRating(result, lowerBound, higherBound)
        result = sortByRating(result)
        console.log(result.length)

        writeListFromRatingsArray(result,title)
    }).catch((error) => console.log(error))

}

main()

