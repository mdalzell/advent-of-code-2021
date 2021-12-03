import { readFileSync } from "fs";

const readInput = (filePath: string) => {
    const data = readFileSync(filePath, 'utf-8');
    return data.split(/\r?\n/)
}

type DirectionFn = (value: number) => void;

const dayTwo = ({ onForward, onUp, onDown }: { onForward: DirectionFn, onUp: DirectionFn, onDown: DirectionFn }) => {
    const lines = readInput("input/day-two.txt")

    lines.forEach((line) => {
        const [direction, value] = line.split(" ")
        if(direction === "forward") onForward(+value)
        else if(direction === "up") onUp(+value)
        else if(direction === "down") onDown(+value)
    })
}

const partOne = () => {
    let depth = 0;
    let horizontalPosition = 0;

    dayTwo({
        onForward: (value) => { horizontalPosition += value },
        onUp: (value) => { depth -= value },
        onDown: (value) => { depth += value }
    })

    return depth * horizontalPosition;
}


const partTwo = () => {
    let depth = 0;
    let horizontalPosition = 0;
    let aim = 0;

    dayTwo({
        onForward: (value) => { 
            horizontalPosition += value 
            depth += aim * value
        },
        onUp: (value) => { aim -= value },
        onDown: (value) => { aim += value }
    })

    return depth * horizontalPosition;
}

console.log("Day 2 - Part 1:", partOne())
console.log("Day 2 - Part 2:", partTwo())