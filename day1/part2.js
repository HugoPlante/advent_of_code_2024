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

        let dict = {};

        list1.map(val => {
            dict[val] = 0;
        })

        list2.map(val => {
            if (dict[val] != undefined) {
                dict[val] += 1;
            }
        })

        let total = 0;

        for (const [key, value] of Object.entries(dict)) {
            total += key * value;
        }

        console.log("result = " + total)
    });
}

start();