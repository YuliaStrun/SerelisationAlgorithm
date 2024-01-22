const convertArrayToObj = (arr) => {
    let obj = {};

    for (let i = 0; i < arr.length; i++) {
        const key = arr[i];
        obj[key] = (obj[key] ?? 0) + 1;
    }

    return obj;
}

const serializeArray = (arr) => {
    const obj = convertArrayToObj(arr);
    const string = Object.keys(obj).map(key => obj[key] === 1 ? `${key}` : `${key}-${obj[key]}`).join();

    return string;
}

const deserializeString = (string) => { 
    let resultArray = [];
    let array = string.split(',');
    for (let i = 0; i < array.length; i++) {
        if(array[i].includes('-')) {
            let element = array[i].split('-');
            for (let j = 0; j < element[1]; j++) {
                resultArray.push(+element[0]);
            }
        } else {
            resultArray.push(+array[i]);
        }
    }

    return resultArray;
}

export { serializeArray, deserializeString };