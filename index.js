const { parse } = require("csv-parse")
const fs = require("fs")

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
    allLines.push("Position,Title,Year,URL,Description")

    for ( let i = 0 ; i < ratingsArray.length ; i++ ){
        let betterLine = `${i+1},${ratingsArray[i][1]},${ratingsArray[i][2]},${ratingsArray[i][3]},,`
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


function main(){
    readWatchedFile("./ratings.csv")
    .then((result) => {
        result = filterByRating(result, 4, 5)
        result = sortByRating(result)
        console.log(result.length)

        writeListFromRatingsArray(result,"Top100-700")
    }).catch((error) => console.log(error))

}

main()

