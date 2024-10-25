const fs = require('fs');

function readJson(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

function decodeValue(value, base) {
    return parseInt(value, base);
}

function findConstantTerm(points) {
    let c = 0;
    const k = points.length;

    for (let i = 0; i < k; i++) {
        let xi = points[i][0];
        let yi = points[i][1];

        let term = yi;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = points[j][0];
                term *= -xj / (xi - xj);
            }
        }
        c += term;
    }

    return Math.round(c); 
}

function main(filePath) {
    const jsonInput = readJson(filePath);
    const n = jsonInput.keys.n;
    const k = jsonInput.keys.k;

    if (n < k) {
        console.error("The number of roots provided must be greater than or equal to k.");
        return;
    }


    let points = [];
    for (let key in jsonInput) {
        if (key !== 'keys') {
            const x = parseInt(key);
            const base = parseInt(jsonInput[key].base);
            const encodedValue = jsonInput[key].value;
            const y = decodeValue(encodedValue, base);
            points.push([x, y]);
        }
    }

    points = points.slice(0, k);

    const constantTerm = findConstantTerm(points);

  
    console.log(`The constant term (c) is: ${constantTerm}`);
}


main('testcase1.json');
main('testcase2.json');
