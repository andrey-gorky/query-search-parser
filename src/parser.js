const url = require('url');

//!!! Need to figure out how to ignore & from command line

const urlValidityCheck = url => {
    if (url.length < 1) return null;
    if (url.replace('?', '').includes('?') > 0) return console.log('===========URL=============', url);
    // if (url.includes('?')) throw new Error('URL is not valid');
}

// const keySplitter = (key) => {
//     if (key.includes('.')) {
//        let keys = key.split('.');
//        let result;
//        for (let i = 0; i < keys.length; i++) {
//            keys[i].keys[i+1];
//        }
//     }
// }

//!!!!!! const keySplitter = (key) => {
//     let tempObject = {}
//     if (key.includes('.')) {
//         tempObject = JSON.parse('{"' + key.replace(/./g, '": {"').replace(/&/g, '","').replace(/=/g,'":"') + '}')
//     }
//     return key;
// }
// JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

//!!!!!!!!! function index(obj,is, value) {
//     if (typeof is == 'string'){
//         return index(obj,is.split('.'), value);
//     } else if (is.length==1 && value!==undefined) {
//         return obj[is[0]] = value;
//     } else if (is.length==0) {
//         return obj;
//     }
//     else {
//         let result = index(obj[is[0]],is.slice(1), value);
//         console.log('==========RESUUUUULT=======', result);
//         return index(obj[is[0]],is.slice(1), value);
//     }
// }

//!!1 const recompose = (obj, string, value) => {
//     var parts = string.split('.');
//     var newObj = obj[parts[0]];
//     if (parts[1]) {
//       parts.splice(0, 1);
//       var newString = parts.join('.');
//       return recompose(newObj, newString);
//     }
//     return newObj;
// }

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
    if (queryURL.replace('?', '').includes('?') > 0) throw new Error('URL is invalid');
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
