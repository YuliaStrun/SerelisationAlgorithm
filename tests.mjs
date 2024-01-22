import {serializeArray, deserializeString} from './laboratory.mjs'

const generateRandomNumbers = (amount, start, end) => {
    const numbers = [];

    for (let i = 0; i < amount; i++) {
        const randomNumber = Math.floor(Math.random() * end) + start;
        numbers.push(randomNumber);
    }

    return numbers;
}

const compearArrs = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false;
    }
    
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    
    return true;
}

const outputResults = (name, array, serializedString) => {
    console.log(new Blob([array.toString()]).size, new Blob([serializedString]).size)
    console.log(
        'Compression Ratio:', `${(100 - new Blob([serializedString]).size / new Blob([array.toString()]).size * 100).toFixed(2)}%`
    );
    console.log(`Test '${name}'`, compearArrs(deserializeString(serializedString), array.sort((a, b) => a - b)) ? 'passed' : 'failed');
    console.log("-------------------------------------------")
}

const testRandomNumbers = (name, amount, start, end) => {
    const randomNumbers = generateRandomNumbers(amount, start ?? 1, end ?? 300);
    const serializedString = serializeArray(randomNumbers);
    outputResults(name, randomNumbers, serializedString)
}

const testTripleNumbers = (name, amount) => {
    const numbers = [];
    for (let i = 0; i < amount / 3; i++) {
        numbers.push(i, i, i);
    }
    const serializedString = serializeArray(numbers);
    outputResults(name, numbers, serializedString)
}

testRandomNumbers('50 numbers', 50);
testRandomNumbers('100 numbers', 100);
testRandomNumbers('500 numbers', 500);
testRandomNumbers('1000 numbers', 1000);
testRandomNumbers('1000 numbers from 1 to 9', 1000, 1, 9);
testRandomNumbers('1000 numbers from 10 to 99', 1000, 10, 99);
testRandomNumbers('1000 numbers from 100 to 999', 1000, 100, 300);
testTripleNumbers('each number has 3', 900);