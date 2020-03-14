#!/usr/bin/env node
/*jshint node:true, es5:true */
const pagedown = require('pagedown');
const converter = new pagedown.Converter();
const fs = require('fs');
const template = fs.readFileSync("./docs/index-template.html").toString();
const md = fs.readFileSync("README.md").toString();


// Configure section and toc generation
converter.hooks.set("postConversion", (text) => {
    return text
        .replace(/~~(.*)~~/g, (match, p1) => '<span style="text-decoration: line-through">' + p1 + '</span>')
});


const readMeHtmlized = converter.makeHtml(md);

const htmlResult = template
    .replace('<!-- ##INJECTION PLACEHOLDER##-->', readMeHtmlized)
    .replace('mailto%3a', 'mailto:')
    .replace('<img src="build/icons/48x48.png" width="48" height="auto">', '')
    .replace(/<pre>/g, '<pre style="background-color: black; color: green; padding: 20px">');

fs.writeFileSync('index.html', htmlResult);
console.log("Html generated");
