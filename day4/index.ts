import fs from "fs";

function parseGrid(input: string): string[][] {
    return input.split('\n').filter(Boolean).map(line => line.split(''));
}

function countXmas(grid: string[][]): number {
    const directions: [number, number][] = [
        [0, 1], [1, 1], [1, 0], [1, -1],
        [0, -1], [-1, -1], [-1, 0], [-1, 1]
    ];
    const rows = grid.length, cols = grid[0].length;
    let count = 0;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] !== 'X') continue;

            for (const [dx, dy] of directions) {
                const target = ['X', 'M', 'A', 'S'];
                const isValidPattern = target.every((char, i) => {
                    const newRow = row + dx * i;
                    const newCol = col + dy * i;
                    return newRow >= 0 && newRow < rows &&
                        newCol >= 0 && newCol < cols &&
                        grid[newRow][newCol] === char;
                });

                if (isValidPattern) count++;
            }
        }
    }
    return count;
}

function countXmas2(grid: string[][]): number {
    const rows = grid.length, cols = grid[0].length;
    let count = 0;

    for (let row = 1; row < rows - 1; row++) {
        for (let col = 1; col < cols - 1; col++) {
            if (grid[row][col] === 'A' && checkMas(grid, row, col)) {
                count++;
            }
        }
    }
    return count;
}

function checkMas(grid: string[][], row: number, col: number): boolean {
    const diagonals = [
        [[-1, -1], [0, 0], [1, 1]],
        [[-1, 1], [0, 0], [1, -1]]
    ];

    return diagonals.every(diagonal => {
        const pattern = diagonal.map(([dx, dy]) =>
            grid[row + dx][col + dy]
        );
        return ['MAS', 'SAM'].some(seq =>
            seq === pattern.join('')
        );
    });
}

// Tests
function testXmas() {
    const input = "MMMSXXMASM\n" +
        "MSAMXMSMSA\n" +
        "AMXSXMAAMM\n" +
        "MSAMASMSMX\n" +
        "XMASAMXAMM\n" +
        "XXAMMXXAMA\n" +
        "SMSMSASXSS\n" +
        "SAXAMASAAA\n" +
        "MAMMMXMMMM\n" +
        "MXMXAXMASX";

    console.log("test 1 : there is 18 xmas, " + (countXmas(parseGrid(input)) === 18));
}

function testXmas2() {
    const input = ".M.S......\n" +
        "..A..MSMS.\n" +
        ".M.S.MAA..\n" +
        "..A.ASMSM.\n" +
        ".M.S.M....\n" +
        "..........\n" +
        "S.S.S.S.S.\n" +
        ".A.A.A.A..\n" +
        "M.M.M.M.M.\n" +
        "..........";

    console.log("test 2 : there is 9 x-mas, " + (countXmas2(parseGrid(input)) === 9));
}
// Run tests
testXmas();
testXmas2();

const input = fs.readFileSync("input.txt", "utf8");

console.log("part 1 result = " + countXmas(parseGrid(input)))
console.log("part 2 result = " + countXmas2(parseGrid(input)))