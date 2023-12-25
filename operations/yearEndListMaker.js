const { parse } = require("csv-parse")
const fs = require("fs")
const prompt = require("prompt-sync")();

const readDiary = require("../utilities/readLetterboxdFile")
const { getNumber } = require("../utilities/betterPrompt")


/* 
input: export from letterboxd transfered to array 
output: all entries not watched in given year are removed  
*/

function filterByWatchedYear(ratingsArray, watchedYear){

    function yearCheck(item){
        let year = item[item.length-1].split("-")[0]
        return year === watchedYear
    }

    return ratingsArray.filter(yearCheck)
}


function sortByRating(ratingsArray){
    return ratingsArray.sort((a,b) => b[4]-a[4])
}

function filterRewatches(ratingsArray){
    return ratingsArray.filter((item) => item[5] !== "Yes")
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

    const year = getNumber("What year are you looking to make a list out of?", 2000, 2100)
    const title = prompt("What do you want your list to be called?\t")

    readDiary("./diary.csv").then((result) => {

        result = filterByWatchedYear(result,year.toString())
        result = filterRewatches(result)
        result = sortByRating(result)

        console.log(result.length)

        writeListFromRatingsArray(result,title)
    }).catch((error) => console.log(error))

}

main()



