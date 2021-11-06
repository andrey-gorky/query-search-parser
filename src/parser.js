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

const recompose = (keys, value) => {
    const keyss = keys;
    const valuee = value;
    var tempObject = {};
    var container = tempObject;
    keyss.split('.').map((k, i, values) => {
       container = (container[k] = (i == values.length - 1 ? valuee : {}))
    });
    console.log(JSON.stringify(tempObject, null, ' '));
    return tempObject
}


const clean = (value) => {
    let TRUE_VALUES = ['true'];
    if (!value || TRUE_VALUES.includes(value)) {
        return true
    } else if (!value.includes('"') && !isNaN(Number(value))) {
        return Number(value)
    } 
    return value.replace(/"/g, '')
}

const parser = (query) => {
    const queryURL = new URL(query).search;
    console.log('========queryURL==============', queryURL)
    if (queryURL.length < 1) return null;
    if (queryURL.replace('?', '').includes('?') > 0) throw new Error('URL is invalid');
    const params = new URLSearchParams(queryURL);

    // console.log('============PARAMS=========', params);
    
    let jsonObj = {}
    params.forEach((value, key) => {
        // console.log(typeof (key), '===========KEY AND VALUE',value)
        if(value && key.includes('.')) {
            // let keys = key.split('.');
            // console.log('=================', keys)
            // index(jsonObj, key, value)
            return Object.assign(jsonObj, recompose(key, value))
            // return jsonObj = recompose(key, value)
        }
        if (value) return jsonObj[key] = clean(value)
    })

    console.log('============jsonObj JSON=========', jsonObj)

    return jsonObj
};

module.exports = parser;
// JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')