import fs from "fs";

const regex1 = /mul\(\d+,\d+\)/g;

const matches1 = fs
    .readFileSync("input.txt", "utf8")
    .match(regex1);

const result1 = matches1?.reduce((acc, mulString) => {
    const [_, num1, num2] = mulString.match(/mul\((\d+),(\d+)\)/) || [];
    return acc + (parseInt(num1) * parseInt(num2));
}, 0);


console.log("part 1 result = " + result1)

// PART 2
const regex2 = /(?:mul\(\d+,\d+\)|do\(\)|don't\(\))/g;

const matches2 = fs
    .readFileSync("input.txt", "utf8")
    .match(regex2);

let mulIsEnabled = true;

const result2 = matches2?.reduce((acc, mulString) => {
    if (mulString.includes("don't()")) {
        mulIsEnabled = false;
        return acc;
    } else if (mulString.includes("do()")) {
        mulIsEnabled = true;
        return acc;
    }
    if (mulIsEnabled) {
        const [_, num1, num2] = mulString.match(/mul\((\d+),(\d+)\)/) || [];
        return acc + (parseInt(num1) * parseInt(num2));
    }
    return acc;
}, 0);

console.log("part 2 result = " + result2)