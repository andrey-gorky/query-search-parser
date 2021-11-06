const url = require('url');

//!!! Need to figure out how to ignore & from command line

const urlValidityCheck = url => {
    if (url.length < 1) return null;
    if (url.lastIndexOf('?') > 0) throw new Error('URL is not valid');
}

const keySplitter = (keys, value) => {
    var tempObject = {};
    var container = tempObject;
    keys
        .split('.')
        .map((k, i, values) => {
            container = (container[k] = (i == values.length - 1 ? value : {}))
        });
    return tempObject
}

const clean = (value) => {
    let checkIfTrue = ['true'].includes(value);
    let checkIfFalse = ['false'].includes(value);
    let checkIfNumber = !value.includes('"') && !isNaN(Number(value));

    if (checkIfTrue) return true
    else if (checkIfFalse) return false
    else if (checkIfNumber) return Number(value) 
    return value.replace(/"/g, '')
}

const parser = (query) => {
    const queryURL = new URL(query).search;
    if (queryURL.length < 1) return null;
    if (queryURL.lastIndexOf('?') > 0) throw new Error('URL is invalid');
    const params = new URLSearchParams(queryURL);

    let jsonObj = {}
    params.forEach((value, key) => {
        if(value && key.includes('.')) 
            return Object.assign(jsonObj, keySplitter(key, value))
        if (value) 
            return jsonObj[key] = clean(value)
    })
    console.log(JSON.stringify(jsonObj, null, ' '));
    return jsonObj
};

module.exports = parser;
