import fs from "fs";

type Direction = "up" | "down" | "left" | "right";

const directions: Record<Direction, [number, number]> = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1],
};

function parseGrid(input: string): string[][] {
    return input.split('\n').filter(Boolean).map(line => line.split(''));
}

function findStartPosition(grid: string[][]): { startX: any; startY: any; } {

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            if (grid[x][y] === '^') {
                return { startX: x, startY: y }
            }
        }
    }
    throw new Error("starting location not found")
}

function traverseGrid(grid: string[][]) {
    const { startX, startY } = findStartPosition(grid)

    let currentX = startX;
    let currentY = startY;

    const directions: [number, number][] = [
        [-1, 0], // haut
        [0, 1],  // droite
        [1, 0],  // bas
        [0, -1], // gauche
    ];

    let currentDirection = 0;
    let [dx, dy] = directions[0]
    while (true) {
        const newX = currentX + dx;
        const newY = currentY + dy;
        grid[currentX][currentY] = "X";

        // Vérifiez si on sort de la grille
        if (newX < 0 || newX >= grid.length || newY < 0 || newY >= grid[0].length) return grid;

        if (grid[newX][newY] === "#") {
            currentDirection = (currentDirection + 1) % 4;
            [dx, dy] = directions[currentDirection];
        } else {
            currentX = newX;
            currentY = newY;
        }
    }
}

function findUniqueXCount(grid: string[][]) {
    let count = 0;
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            if (grid[x][y] === 'X') {
                count++;
            }
        }
    }
    return count;
}

function findPossibleLoopPositions(grid: string[][]): number {
    let nbPossibleObstaclePlacement = 0;

    // Create a deep copy of the grid to avoid modifying the original
    const gridCopy = grid.map(row => [...row]);

    // Iterate through every cell in the grid
    for (let x = 0; x < gridCopy.length; x++) {
        for (let y = 0; y < gridCopy[x].length; y++) {
            // Only consider empty cells
            if (gridCopy[x][y] === '.') {
                // Create a new grid for this iteration
                const testGrid = gridCopy.map(row => [...row]);

                // Place an obstacle
                testGrid[x][y] = '#';

                // Try to traverse and see if it loops
                if (isLoopTraversal(testGrid)) {
                    nbPossibleObstaclePlacement++;
                }

                // Reset the cell
                testGrid[x][y] = '.';
            }
        }
    }

    return nbPossibleObstaclePlacement;
}

function isLoopTraversal(grid: string[][]): boolean {
    const { startX, startY } = findStartPosition(grid);

    let currentX = startX;
    let currentY = startY;
    const directions: [number, number][] = [
        [-1, 0], // up
        [0, 1],  // right
        [1, 0],  // down
        [0, -1], // left
    ];
    let currentDirection = 0;
    let [dx, dy] = directions[0];

    // Track visited cells to detect loops
    const visited = new Set<string>();

    while (true) {
        const newX = currentX + dx;
        const newY = currentY + dy;

        // Check if we've been in this exact state before
        const stateKey = `${currentX},${currentY},${currentDirection}`;
        if (visited.has(stateKey)) {
            return true; // Loop detected
        }
        visited.add(stateKey);

        // Check grid boundaries
        if (newX < 0 || newX >= grid.length || newY < 0 || newY >= grid[0].length) {
            return false; // Exited grid, not a loop
        }

        if (grid[newX][newY] === "#") {
            currentDirection = (currentDirection + 1) % 4;
            [dx, dy] = directions[currentDirection];
        } else {
            currentX = newX;
            currentY = newY;
        }
    }
}

const input = fs.readFileSync("input.txt", "utf8");
const grid = parseGrid(input);
const uniqueX = findUniqueXCount(traverseGrid(grid));
console.log("result part 1 : " + uniqueX)

console.log("result part 2 : " + findPossibleLoopPositions(parseGrid(input)))
