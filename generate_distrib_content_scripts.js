#!/usr/bin/env node
const fs = require("fs");

const contentScriptFile = process.argv[2];
if (!contentScriptFile) throw new Error("missing file argument");

const contentScriptFilePath = contentScriptFile.substring(0, contentScriptFile.lastIndexOf("/"));
const contentScript = fs.readFileSync(contentScriptFile, "utf8");
var distributorScript = '';



fs.readdir(contentScriptFilePath + '/distributors', function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        distributorScript = fs.readFileSync(contentScriptFilePath + '/distributors/' + file, "utf8"); 
        distributorScript = contentScript + distributorScript;
        fs.writeFileSync(contentScriptFilePath + '/distributors/' + file, distributorScript, "utf8");
    });
});