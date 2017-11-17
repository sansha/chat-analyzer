"use strict";
var path = require('path');
var fs = require('fs');
// read profiles and led information
var inputTxt = fs.readFileSync(path.join(__dirname, '/txt/test.txt'), 'utf8');
var messagesRaw = inputTxt.split(/\n(?=\d\d\.\d\d\.\d\d, \d\d:\d\d - )/);

let messagesParsed = messagesRaw.map(m => {
    let idx = m.indexOf(" - ");
    let msgAll = m.substr(idx + 3);
    let totalDate = m.substr(0, idx);
    let msgIdx = msgAll.indexOf(": ");
    let author = msgAll.substr(0, msgIdx);
    let msg = msgAll.substr(msgIdx + 2);

    let [date, time] = totalDate.split(", ");
    let [day, month, year] = date.split(".").map(a => parseInt(a));
    let [hour, minute] = time.split(":").map(a => parseInt(a));
    let timestamp = new Date(year+2000, month-1, day, hour, minute, 0, 0);
     return {timestamp: +timestamp, author: author, msg: msg};
});

console.log(JSON.stringify(messagesParsed, null, 4));