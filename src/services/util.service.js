export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    delay,
    getFilename,
    // getDate,
    getDeepCopy
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function delay(ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}
window.util = getFilename()

function getFilename(strUrl) {
    let filename
    if (isValidUrl(strUrl)) {
        const URLObj = new URL(strUrl)
        const { pathname } = URLObj
        filename = pathname.split('/').pop()
        if (!filename.includes('.')) filename += '.jpeg'
        if (filename.includes('fakepath'))
            filename = pathname.match(/[^\\/]*$/)[0]
    } else {
        filename = 'http://' + strUrl
    }
    return filename
}

function isValidUrl(str) {
    const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    return matchpattern.test(str);
}

function getDeepCopy(object) {
    return JSON.parse(JSON.stringify(object))
}

// function getDate(ts, separator = '') {
//     const dateStyle = {
//         month: 'short',

//     }
//     let formatter = new Intl.DateTimeFormat('en-US', { month: 'short' });
//     let newDate = new Date(ts)
//     let date = newDate.getDate();
//     let month = ;
//     let year = newDate.getFullYear();

//     return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
//     }