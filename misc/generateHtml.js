#!/usr/bin/env node
/*jshint node:true, es5:true */
const pagedown = require('pagedown');
const converter = new pagedown.Converter();
const fs = require('fs');
const template = fs.readFileSync("./docs/index-template.html").toString();
const md = fs.readFileSync("README.md").toString();


const readMeHtmlized = converter.makeHtml(md);

const htmlResult = template
    .replace('<!-- ##INJECTION PLACEHOLDER##-->', readMeHtmlized)
    .replace('<img src="https://raw.githubusercontent.com/lopidio/stacker/master/build/logo-small.png" width="50" height="auto">', '');

fs.writeFileSync('docs/index.html', htmlResult);
console.log("Html generated");
