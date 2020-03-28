#!/usr/bin/env node
/*jshint node:true, es5:true */
const pagedown = require('pagedown');
const converter = new pagedown.Converter();
const https = require('https');
const fs = require('fs');
const template = fs.readFileSync('./docs/index-template.html').toString();
const md = fs.readFileSync('./docs/README.md').toString();

function request(url) {
    return new Promise((resolve, reject) => {
        const request = https.request(url, {
            'User-Agent': 'stacker-index'
        }, (resp) => {
            let data = '';
            resp
                .on('data', (chunk) => {
                    data += chunk;
                })
                .on('end', () => {
                    resolve({data, statusCode: resp.statusCode});
                });
        }).on('error', (err) => {
            reject(err);
        });
        request.write('');
        request.end();
    });
}

function getProtocols(plugins) {
    const protocols = plugins.reduce((acc, plugin) => {
        acc = acc.concat(plugin.publishers || []);
        acc = acc.concat(plugin.subscriptions || []);
        return acc;
    }, []);
    return Array.from(new Set(protocols));
}

function pluginsListContainer(plugins) {
    const innerHtml = plugins
        .map(plugin => {
            return ` <div class="row no-gutters py-1 plugins-list-row">
                          <div class="col-12 col-md-6 col-lg-3" style="">
                            <a href="https://github.com/${plugin.author}" target="_blank" style="overflow: scroll; white-space: nowrap;">
                                <img src="${plugin.logo}" style="width: 15%;" class="img-fluid rounded mx-auto px-2 rounded-circle">
                                @${plugin.author}
                            </a>
                          </div>
                          <div class="col-12 col-md-6 col-lg-3 pl-5 pl-lg-0">
                            <a href="${plugin.repositoryUrl}" style="overflow: scroll; white-space: nowrap;" target="_blank">${plugin.name}</a>
                          </div>
                          <div class="col-12 col-lg-6 pb-3 pl-5 pl-lg-0 pb-sm-1 pb-lg-0" style="color: var(--carabina-text-darker-color); overflow: scroll; white-space: nowrap;">
                            ${plugin.description}
                          </div>
                    </div>`;
        })
        .join('');
    return `
                    <div class="container m-0 p-3" style="background-color: var(--carabina-nav-bar-background-color)">
                      <div class="row no-gutters pb-1">
                        <div class="col-12 col-md-6 col-lg-3"><h5 class="px-1">Author</h5></div>
                        <div class="col-12 col-md-6 col-lg-3"><h5 class="px-1">Name</h5></div>
                        <div class="col-12 col-lg-6 pb-3 pb-sm-1 pb-lg-0"><h5 class="px-1">Description</h5></div>
                      </div>
                      ${innerHtml}
                    </div>`;
}

async function generateHtml() {
    const plugins = JSON.parse((await request('https://raw.githubusercontent.com/enqueuer-land/stacker-plugins/master/plugins.json')).data);
    const protocols = getProtocols(plugins);
    const readMeHtmlized = converter.makeHtml(md);

    const htmlResult = template
        .replace('<!-- ##INJECTION PLACEHOLDER## -->', readMeHtmlized)
        .replace('<!-- {{plugins-names-placeholder}} -->', protocols.map(protocol => `<li>${protocol.toUpperCase()}</li>`).join(''))
        .replace('{{plugins list placeholder}}', pluginsListContainer(plugins))
        .replace('mailto%3a', 'mailto:')
        .replace('<img src="../build/icons/48x48.png" width="48" height="auto">', '')
        .replace(/~~(.*)~~/g, (match, p1) => '<span style="text-decoration: line-through">' + p1 + '</span>')
        .replace(/<pre>/g, '<pre style="background-color: black; color: green; padding: 20px">');

    fs.writeFileSync('./docs/index.html', htmlResult);


}

generateHtml()
    .then(() => console.log("Html generated"));
