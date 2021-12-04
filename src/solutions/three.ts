import { readInput } from "../shared/io"

type CharDictionary = {
    [k: string]: {
        0: number;
        1: number;
    }
}

const dayThree = () => {
    const lines = readInput("input/day-three.txt")


    const charDictionary: CharDictionary = {};
    const numberOfDigits = lines[0].length;
    for (let i = 0; i < numberOfDigits; i++){
        charDictionary[i] = { 0: 0, 1: 0 }
    }

    lines.forEach((line) => {
        for(let i = 0; i < line.length; i++){
            const currentIndexValues = charDictionary[i]
            if (line[i] === "0") currentIndexValues[0]++
            else if (line[i] === "1") currentIndexValues[1]++
        }
    })

    let gammaRate = ""
    let epsilonRate = ""

    for (let i = 0; i < numberOfDigits; i++){
        const currentIndexValues = charDictionary[i]

        if (currentIndexValues[1] > currentIndexValues[0]){
            gammaRate += "1"
            epsilonRate += "0"
        }
        else {
            gammaRate += "0"
            epsilonRate += "1"
        }
    }

    return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
}

console.log("Day 3 - Part 1", dayThree())