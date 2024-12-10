import fs from "fs";

function createDiskMap(input: string): string {
    let expandedDiskMap = "";

    for (let i = 0; i < input.length; i++) {
        const digit = parseInt(input[i])

        let charToInsert = i % 2 === 0 ? (i / 2).toString() : "."
        for (let x = 1; x <= digit; x++) {
            expandedDiskMap = expandedDiskMap + charToInsert;
        }
    }

    return expandedDiskMap;
}

function compactDiskMap(file: string): string {
    const diskArray = file.split('');

    for (let i = 0; i < diskArray.length; i++) {
        if (diskArray[i] === '.') {
            let rightmostNumberIndex = diskArray.length - 1;
            while (rightmostNumberIndex > i && diskArray[rightmostNumberIndex] === ".") {
                rightmostNumberIndex--;
            }

            if (rightmostNumberIndex <= i) break;

            diskArray[i] = diskArray[rightmostNumberIndex];
            diskArray[rightmostNumberIndex] = ".";
        }
    }

    return diskArray.join("");
}

function calculateChecksum(compactDisk: string): number {
    return compactDisk.split('').reduce((sum, fileId, pos) => {
        if (fileId === ".") return sum;
        return sum + pos * parseInt(fileId);
    }, 0);
}

const input = fs.readFileSync("input.txt", "utf8").trim();
const compactDisk = compactDiskMap(createDiskMap(input))
console.log("result checksum is: " + calculateChecksum(compactDisk))
