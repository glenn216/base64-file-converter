'use strict';

const prompt = require('prompt');
const fs = require('fs');

prompt.start();

console.log('1. Enter the file path of the file that you want to encode.');
console.log('2. Enter the file file name of the encoded file.');

prompt.get(['filepath', 'filename'], function (err, result) {
    if (err) { return onErr(err); }
    console.log('  File Path: ' + result.filepath);
    console.log('  File Name: ' + result.filename);
    let buff = fs.readFileSync(result.filepath);
    let base64data = buff.toString('base64');
    let writeStream = fs.createWriteStream(result.filename);
    writeStream.write(base64data, 'utf-8');
    writeStream.on('finish', () => {
        console.log('The converted base64 string is saved to ./' + result.filename);
    });
    
    writeStream.end();

function onErr(err) {
    console.log(err);
    return 1;
}});