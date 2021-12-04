import { readInput } from "../shared/io"

type CharDictionary = {
    [k: string]: {
        0: number;
        1: number;
    }
}

const dayThree = (lines: string[], defaultValue: string = "1") => {
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
        else if (currentIndexValues[0] > currentIndexValues[1]) {
            gammaRate += "0"
            epsilonRate += "1"
        }
        else {
            gammaRate += defaultValue
            epsilonRate += defaultValue
        }
    }

    return { gammaRate, epsilonRate }
}

const partOne = () => {
    const lines = readInput("input/day-three.txt")
    const { gammaRate, epsilonRate } = dayThree(lines)

    return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
}

const calculateOxygenGeneratorRating = (lines: string[], currentIndex: number): string => {
    if (lines.length === 1) return lines[0]
    
    const { gammaRate } = dayThree(lines, "1")
    const filteredLines = lines.filter((line) => line[currentIndex] === gammaRate[currentIndex])
    return calculateOxygenGeneratorRating(filteredLines, currentIndex + 1)
}

const calculateCO2ScrubberRating = (lines: string[], currentIndex: number): string => {
    if (lines.length === 1) return lines[0]
    
    const { epsilonRate } = dayThree(lines, "0")
    const filteredLines = lines.filter((line) => line[currentIndex] === epsilonRate[currentIndex])
    return calculateCO2ScrubberRating(filteredLines, currentIndex + 1)
}

const partTwo = () => {
    const lines = readInput("input/day-three.txt")
    const oxygenGeneratorRating = calculateOxygenGeneratorRating(lines, 0)
    const cO2ScrubberRating = calculateCO2ScrubberRating(lines, 0)

    return parseInt(oxygenGeneratorRating, 2) * parseInt(cO2ScrubberRating, 2)
}

console.log("Day 3 - Part 1", partOne())
console.log("Day 3 - Part 2", partTwo())