const fs = require('node:fs');

function start() {
    fs.readFile('input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        const lines = data.trim().split('\n');
        const numberOfSafeLevels = lines.reduce((count, line) => {
            const levels = line.split(' ').map(Number);

            const isValid = isValidReport(levels, levels[0] < levels[1]);
            return count + (isValid ? 1 : 0);
        }, 0);

        console.log("result = " + numberOfSafeLevels);
    });
}

function isValidReport(report) {
    // Check if the report is valid without removal
    if (isStrictlyIncreasingOrDecreasing(report)) {
        return true;
    }

    // Try removing each level and check if it becomes valid
    for (let i = 0; i < report.length; i++) {
        const modifiedReport = [...report.slice(0, i), ...report.slice(i + 1)];
        if (isStrictlyIncreasingOrDecreasing(modifiedReport)) {
            return true;
        }
    }
    return false;
}

function isStrictlyIncreasingOrDecreasing(report) {
    const isIncreasing = report[0] < report[1];

    for (let i = 1; i < report.length; i++) {
        const prevLevel = report[i - 1];
        const currentLevel = report[i];

        if (!adjacentLevelsAreValid(prevLevel, currentLevel, isIncreasing)) {
            return false;
        }
    }
    return true;
}

function adjacentLevelsAreValid(prevLevel, currentLevel, isIncreasing) {
    const levelDifference = Math.abs(prevLevel - currentLevel);
    const isValidDifference = levelDifference >= 1 && levelDifference <= 3;

    return isIncreasing
        ? (currentLevel > prevLevel && isValidDifference)
        : (currentLevel < prevLevel && isValidDifference);
}

start();