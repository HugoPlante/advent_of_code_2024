import fs from "fs";

function solve(stones: number[], nbBlinks: number): number {
    console.log("initial configuration : " + stones)
    let a = stones;
    for (let i = 1; i <= nbBlinks; i++) {
        a = blink(a)
        //console.log(`After blink ${i}:`)
        //console.log(a)
    }
    return a.length;
}

function blink(stones: number[]): number[] {
    const newStones: number[] = []

    stones.forEach(stone => {
        if (stone === 0) {
            newStones.push(1)
        } else if (stone.toString().length % 2 === 0) {
            const stoneString = stone.toString()
            newStones.push(parseInt(stoneString.substring(0, stoneString.length / 2)))
            newStones.push(parseInt(stoneString.substring(stoneString.length / 2)))
        } else {
            newStones.push(stone * 2024)
        }
    });
    return newStones;
}

const input = fs.readFileSync("input.txt", "utf8").trim().split(' ').map(Number);
console.log("nb stones at the end : " + solve(input, 25))
