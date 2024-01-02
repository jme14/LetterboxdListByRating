
/* this operation takes two list contained in a folder, and if the lists are the same length, the changes in the list will be written to the description" */


const fs = require("fs")
const readListsFromCompareFolder = require("../utilities/readListsFromCompareFile")
const { getYesOrNo } = require("../utilities/betterPrompt")

async function main(){
    //step 1: read lists from folder 
    let bothLists = readListsFromCompareFolder()
    console.log(bothLists.length)
    //step 2: read both lists into to separate data structures 

    let oldList = null
    let newList = null

    await Promise.all(bothLists).then( (values) => {
        oldList = values[0]
        newList = values[1]
    })

    //console.log(newList)
    //console.log(oldList)
    //step 3: maintain integer array for each element in newer list corresponding to spots jumped, fallen, or NULL if the item is new 
    function findMatch(oldList, titleNeeded, yearNeeded){

        // returns element in old array of matching title and year 
        for (let i = 0 ; i < oldList.length ;i++){
            if ( oldList[i][1] === titleNeeded && oldList[i][2] === yearNeeded ){
                return i // returns element value found 
            }
            else {
                /* 
                console.log(oldList[i][1])
                console.log(titleNeeded)
                console.log(oldList[i][2])
                console.log(yearNeeded)
                */
            }
        }
        // if item never found, just return null 
        return null 
    }

    let finder = []
    for ( let i = 0 ; i < newList.length ; i++){
        let elementFound = findMatch(oldList, newList[i][1], newList[i][2])
        finder.push(elementFound)
    }

    //console.log(finder)

    //step 4: given this created array, add the number gained, lost, or if its new as description onto the list to be edited and export that file  

    function writeListWithRankChanges(newList, finder){
        for ( let i = 0 ; i < newList.length ; i++ ){
            if ( finder[i] !== null ) { 
                finder[i] = finder[i]-i
                if ( finder[i] > 0 ){
                    finder[i] = "+" + finder[i].toString()
                } else if ( finder[i] < 0 ) {
                    finder[i] = finder[i].toString()
                } else {
                    finder[i] = "--"
                }

            }
            else {
                finder[i] = "NEW"
            }
        }


        let allLines = [];
        allLines.push("Title,Year,URL,Review")

        for ( let i = 0 ; i < newList.length ; i++ ){
            let betterLine = `"${newList[i][1]}",${newList[i][2]},${newList[i][3]},${finder[i]},`
            allLines.push(betterLine)
        }

        let stream = fs.createWriteStream(`./newLists/comparison.csv`,)

        allLines.forEach((element)=>{
            stream.write(element+"\n")
        })

        stream.end()

    }

    writeListWithRankChanges(newList, finder)
}

main()