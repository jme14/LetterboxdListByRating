const fs = require("fs")
const { parse } = require("csv-parse")

const readLetterboxdFile = require("./readLetterboxdFile")

// READ THE WATCHED FILE 
// input: file location 
// output: an array of strings corresponding to each line of the file 
function readListsToCompare(){


    let files = fs.readdirSync("comparisonFiles")

    let bothFiles = []
    for ( let file in files){
        console.log(files[file])
        if ( files[file].split(".")[1] === "csv"){
            bothFiles.push(readLetterboxdFile("comparisonFiles/" + files[file]))
        }
    }

    return bothFiles
}

module.exports = readListsToCompare