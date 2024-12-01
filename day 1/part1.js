const fs = require('node:fs');

function start() {
    let list1 = [];
    let list2 = [];

    fs.readFile('input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        const lines = data.trim().split('\n');

        lines.forEach(line => {
            const [num1, num2] = line.split('   ').map(Number);
            list1.push(num1);
            list2.push(num2);
        });

        list1.sort();
        list2.sort();

        let total = 0;

        list1.forEach((val1, index) => {
            let val2 = list2.at(index)
            let distance = Math.abs(val1 - val2)
            total += distance
        })

        console.log("result = " + total)
    });
}

start();