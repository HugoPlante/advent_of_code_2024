import fs from "fs";

function parseInput(input: string): { rules: string[], updates: string[] } {
    const lines = input.split("\n").map(line => line.trim());
    let rules: string[] = [];
    let updates: string[] = [];
    let foundEmptyLine = false;

    for (const line of lines) {
        if (line.trim() === "" && !foundEmptyLine) {
            foundEmptyLine = true;
        } else if (!foundEmptyLine) {
            rules.push(line);
        } else {
            updates.push(line);
        }
    }

    return { rules, updates };
}

function calculateTotal(rules: string[], updates: string[]): { part1Total: number, invalidUpdates: string[] } {
    let part1Total = 0;
    let invalidUpdates: string[] = [];

    updates.forEach(update => {
        const pages = update.split(",");
        let pageIsValid = true;

        for (let i = 0; i < pages.length - 1; i++) {
            const currentPage = pages[i];
            const nextPage = pages[i + 1];
            if (!rules.includes(`${currentPage}|${nextPage}`)) {
                pageIsValid = false;
                invalidUpdates.push(update);
                break;
            }
        }

        if (pageIsValid) {
            const middlePageIndex = Math.floor(pages.length / 2);
            part1Total += parseInt(pages[middlePageIndex]!, 10);
        }
    });

    return { part1Total, invalidUpdates };
}

function correctUpdateOrder(rules: string[], update: string): string {
    const pages = update.split(",");

    const generatePermutations = (arr: string[]): string[][] => {
        if (arr.length <= 1) return [arr];

        const permutations: string[][] = [];
        for (let i = 0; i < arr.length; i++) {
            const current = arr[i];
            const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];

            const subPermutations = generatePermutations(remaining);
            for (const subPerm of subPermutations) {
                permutations.push([current, ...subPerm]);
            }
        }

        return permutations;
    };

    const isValidOrder = (order: string[]) => {
        for (let i = 0; i < order.length - 1; i++) {
            if (!rules.includes(`${order[i]}|${order[i + 1]}`)) {
                return false;
            }
        }
        return true;
    };

    const permutations = generatePermutations(pages);
    const validPermutation = permutations.find(isValidOrder);

    return validPermutation ? validPermutation.join(",") : update;
}

function solvePart2(rules: string[], invalidUpdates: string[]): number {
    let part2Total = 0;

    for (const update of invalidUpdates) {
        const correctedUpdate = correctUpdateOrder(rules, update);
        const pages = correctedUpdate.split(",");
        const middlePageIndex = Math.floor(pages.length / 2);
        part2Total += parseInt(pages[middlePageIndex]!, 10);
    }

    return part2Total;
}

// Main execution
const input = fs.readFileSync("input.txt", "utf8");
const { rules, updates } = parseInput(input);
const { part1Total, invalidUpdates } = calculateTotal(rules, updates);
const part2Total = solvePart2(rules, invalidUpdates);

console.log("Part 1 Total:", part1Total);
console.log("Part 2 Total:", part2Total);

// Optional: Test case for verification

/* const testInput = fs.readFileSync("test.txt", "utf8");
const { rules, updates } = parseInput(testInput);
const { part1Total, invalidUpdates } = calculateTotal(rules, updates);
const part2Total = solvePart2(rules, invalidUpdates);
console.log("Part 1 test (should be 143):", part1Total);
console.log("Part 2 test (should be 123):", part2Total); */
