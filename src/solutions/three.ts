import { readInput } from "../shared/io"

type CharDictionary = {
    [k: string]: {
        0: number;
        1: number;
    }
}

const buildCharDictionary = (values: string[]) => {
    const charDictionary: CharDictionary = {};
    const numberOfDigits = values[0].length;
    for (let i = 0; i < numberOfDigits; i++){
        charDictionary[i] = { 0: 0, 1: 0 }
    }

    values.forEach((line) => {
        for(let i = 0; i < line.length; i++){
            const currentIndexValues = charDictionary[i]
            if (line[i] === "0") currentIndexValues[0]++
            else if (line[i] === "1") currentIndexValues[1]++
        }
    })

    return charDictionary;
}

const getMostCommonValue = (counts : {0: number, 1: number}) => {
    if (counts[0] > counts[1]){
        return "0"
    }
    else if (counts[1] > counts[0]){
        return "1"
    }

    return "1";
}

const getLeastCommonValue = (counts : {0: number, 1: number}) => {
    if (counts[0] < counts[1]){
        return "0"
    }
    else if (counts[1] < counts[0]){
        return "1"
    }

    return "0";
}

const calculateOxygenGeneratorRating = (values: string[], currentIndex: number): string => {
    if (values.length === 1) return values[0]
    
    const charDictionary = buildCharDictionary(values);
    const filteredLines = values.filter((line) => line[currentIndex] === getMostCommonValue(charDictionary[currentIndex]))
    return calculateOxygenGeneratorRating(filteredLines, currentIndex + 1)
}

const calculateCO2ScrubberRating = (values: string[], currentIndex: number): string => {
    if (values.length === 1) return values[0]
    
    const charDictionary = buildCharDictionary(values);
    const filteredLines = values.filter((line) => line[currentIndex] === getLeastCommonValue(charDictionary[currentIndex]))
    return calculateCO2ScrubberRating(filteredLines, currentIndex + 1)
}

const partOne = () => {
    const lines = readInput("input/day-three.txt")
    const charDictionary = buildCharDictionary(lines);

    let gammaRate = ""
    let epsilonRate = ""

    for (let i = 0; i < lines[0].length; i++){
        const currentIndexValues = charDictionary[i]
        gammaRate += getMostCommonValue(currentIndexValues)
        epsilonRate += getLeastCommonValue(currentIndexValues)
    }


    return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
}

const partTwo = () => {
    const lines = readInput("input/day-three.txt")
    const oxygenGeneratorRating = calculateOxygenGeneratorRating(lines, 0)
    const cO2ScrubberRating = calculateCO2ScrubberRating(lines, 0)

    return parseInt(oxygenGeneratorRating, 2) * parseInt(cO2ScrubberRating, 2)
}

console.log("Day 3 - Part 1", partOne())
console.log("Day 3 - Part 2", partTwo())