import { readFileSync } from "fs";

const readInput = (filePath: string) => {
    const data = readFileSync(filePath, 'utf-8');
    return data.split(/\r?\n/)
}

const dayOnePartOne = () => {
    const depths = readInput("input/day-one.txt");

    let increaseCount = 0;
    depths.reduce((previous, current) => {
        if (+current > +previous) increaseCount++;
        return current;
    })

    console.log("Day One - Part One:", increaseCount)
}

const dayOnePartTwo = () => {
    const depths = readInput("input/day-one.txt");

    let increaseCount = 0;
    const depthWindow: number[] = [];
    depths.forEach((depth) => {
        const current = depthWindow.reduce((a, b) => a + b, 0);
        depthWindow.push(+depth)
        if (depthWindow.length === 4){
            depthWindow.shift();
            const next = depthWindow.reduce((a, b) => a + b, 0)
            if (next > current) increaseCount++;
        }
    })

    console.log("Day One - Part Two:", increaseCount)
}


dayOnePartOne()
dayOnePartTwo()
