import fs from "fs";

function concatenate(a: number, b: number): number {
    return parseInt(`${a}${b}`);
}

function evaluateExpression(numbers: number[], operators: number[]): number {
    let result = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
        switch (operators[i - 1]) {
            case 0: // Addition
                result += numbers[i];
                break;
            case 1: // Multiplication
                result *= numbers[i];
                break;
            case 2: // Concatenation
                result = concatenate(result, numbers[i]);
                break;
        }
    }

    return result;
}

function canSolveEquation(targetSum: number, numbers: number[]): boolean {
    const n = numbers.length;

    const totalCombinations = Math.pow(3, n - 1);

    for (let combo = 0; combo < totalCombinations; combo++) {
        const operators: number[] = [];
        let tempCombo = combo;

        for (let i = 0; i < n - 1; i++) {
            operators.push(tempCombo % 3);
            tempCombo = Math.floor(tempCombo / 3);
        }

        const result = evaluateExpression(numbers, operators);

        if (result === targetSum) {
            return true;
        }
    }

    return false;
}

function solveEquations(lines: string[]) {
    try {
        let total = 0;
        
        lines.forEach(line => {
            const [targetSumStr, ...numbersStr] = line.split(':').map(part => part.trim());

            const targetSum = parseInt(targetSumStr);
            const numbers = numbersStr[0].split(' ').map(num => parseInt(num));

            if (canSolveEquation(targetSum, numbers)) total += targetSum;
        });
        
        console.log("total value : " + total)
    } catch (error) {
        console.error('Error reading or processing file:', error);
    }
}

const input = fs.readFileSync("input.txt", "utf8").trim().split('\n');
solveEquations(input)
