const fs = require('node:fs');

function start() {
    fs.readFile('input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        const lines = data.trim().split('\n');
        const numberOfSafeReports = lines.reduce((count, line) => {
            const levels = line.split(' ').map(Number);

            const isValid = isValidReport(levels, levels[0] < levels[1]);
            return count + (isValid ? 1 : 0);
        }, 0);

        console.log("result = " + numberOfSafeReports);
    });
}

function isValidReport(report, isIncreasing) {
    for (let i = 1; i < report.length; i++) {
        const prevLevel = report[i - 1];
        const currentLevel = report[i];

        if ((isIncreasing && prevLevel >= currentLevel) ||
            (!isIncreasing && prevLevel <= currentLevel) ||
            !checkIfValidAdjacent(prevLevel, currentLevel)) {
            return false;
        }
    }
    return true;
}

function checkIfValidAdjacent(prevLevel, nextLevel) {
    return Math.abs(prevLevel - nextLevel) >= 1 && Math.abs(prevLevel - nextLevel) <= 3;
}

start();