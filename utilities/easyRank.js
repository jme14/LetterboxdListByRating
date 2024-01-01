const { getYesOrNo } = require("./betterPrompt")

/* this functionality implements quicksort to easily allow for users to properly sort a list*/

function firstBetter(film1, film2){
    return getYesOrNo(`Is ${film1[1]} (${film1[2]}) better than ${film2[1]} (${film2[2]})?`)
}


//chooses a partition, then makes it so that all movies better than partition are at the top and all worse are at the bottom
function partition(ratingsArray, low, high){

    function swap(ratingsArray, index1, index2){
        let temp = ratingsArray[index1]
        ratingsArray[index1] = ratingsArray[index2]
        ratingsArray[index2] = temp

        return ratingsArray
    }

    let pivot = ratingsArray[high]

    /* include loop to ask user if partition is a good choice only when the difference between low and high is significant */ 
    if ( high-low > 10 ){
        let pivotApproval = getYesOrNo(`Is ${pivot[1]} (${pivot[2]}) a good pivot?`)
        for ( let i = 1 ; pivotApproval === "n" && high-i > low; i++){
            swap(ratingsArray, high, high-i)
            pivot = ratingsArray[high]
            pivotApproval = getYesOrNo(`Is ${pivot[1]} (${pivot[2]}) a good pivot?`)
        }
    } 
    

    let index1 = low-1 
    let index2 = low 

    let lastChoice = null

    while ( index2 < high){

        let choice = firstBetter(pivot, ratingsArray[index2])

        if ( choice === "b" ){
            index2--
            if ( lastChoice === "y"){
                swap(ratingsArray, index1, index2)
                index1 = index1 -1
            } else if ( lastChoice === "n"){
                index1 = index1 + 1
                swap(ratingsArray, index1, index2)
            } else {
                return -1
            }

            lastChoice = "b"
            index2++
            continue
        }

        if ( choice === "y") { 
            index1 = index1 + 1
            swap(ratingsArray, index1, index2)
        }

        lastChoice = choice
        index2++
    }

    swap(ratingsArray, index1+1, high)


    return index1+1
}


/* this could be extremely messed up */ 
function randomize(ratingsArray){
    let randomizer = [];
    let ratingsArrayRandomized = [];
    for ( let i = 0 ; i < ratingsArray.length ; i++){
        randomizer.push(i)
        ratingsArrayRandomized.push(ratingsArray[i])
    }
    let possible = ratingsArray.length
    let newRatingsArray = []
    for ( let i = 0 ; i < ratingsArray.length ; i++){
        let randomNumber = Math.floor(Math.random()*possible)
        possible = possible-1
        newRatingsArray.push(ratingsArrayRandomized.splice(randomNumber,1)[0])
    }
    return newRatingsArray
}

function quickSort(ratingsArray){

    let randomized = randomize(ratingsArray)
    //let randomized = ratingsArray

    return (recursiveQuickSort(randomized, 0, ratingsArray.length-1))
}

function recursiveQuickSort(ratingsArray, low, high){

    //console.log(ratingsArray)
    //console.log(low)
    //console.log(high)

    if ( low < high){

        let pivot = -1
        while ( pivot === -1){
            pivot = partition(ratingsArray, low, high)
        }

        ratingsArray = recursiveQuickSort(ratingsArray, low, pivot-1)
        ratingsArray = recursiveQuickSort(ratingsArray, pivot+1, high)
    }

    return ratingsArray

}

module.exports = quickSort