const fs = require("fs")
const { parse } = require("csv-parse")

// READ THE WATCHED FILE 
// input: file location 
// output: an array of strings corresponding to each line of the file 
function readDiaryFile(fileLocation){

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

module.exports = readDiaryFile