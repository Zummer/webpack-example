const express = require('express');
// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
const fs = require("fs");
const isObject = require('is-object');
const app = express();
// const config = require('./webpack.config.js');
// const compiler = webpack(config);

// app.use(webpackDevMiddleware(compiler, {
//     serverSideRender: true
// }));
//
// app.use(webpackHotMiddleware(compiler, {
//     log: console.log,
// }));

app.use(express.static('public'));
app.use(express.static('public/js'));

app.use('/another', (req, res) => {
    res.send(serverRender('', ['vendor'], ['vendor', 'common', 'another']));
});

function normalizeAssets(assets) {
    if (isObject(assets)) {
        return Object.values(assets);
    }

    return Array.isArray(assets) ? assets : [assets];
}

function getAssets(assets, keys, endsWith) {
    let content = "";
    keys.forEach(key => {
        if (assets.hasOwnProperty(key) && assets[key].hasOwnProperty(endsWith)) {
            switch (endsWith) {
                case 'css':
                    content = content + `<link rel="stylesheet" href=${assets[key][endsWith]}>`;
                    break;
                case 'js':
                    content = content + `<script src="${assets[key][endsWith]}"></script>`;
                    break;
            }
        }
        // const asset = normalizeAssets(assetsByChunkName[key])
        //     .filter((path) => path.endsWith(`.${endsWith}`))
        //     .map((path) => {
        //         switch (endsWith) {
        //             case 'css':
        //                 return `<link rel="stylesheet" href=${path}>`;
        //             case 'js':
        //                 return `<script src="${path}"></script>`;
        //
        //         }
        //     });
        // content = content + asset;

    });
    return content;
}

function serverRender(body, stylesKeys, jsKeys) {

    const contents = fs.readFileSync(__dirname + "/public/js/webpack-assets.json");
    const assets = JSON.parse(contents);

    const styles = getAssets(assets, stylesKeys, 'css');
    const js = getAssets(assets, jsKeys, 'js');

    return (
        `<html>
                <head>
                    ${styles}
                </head>
                <body>
                    ${body}
                    ${js}
                </body>
            </html>`
    );
}

app.use('/', (req, res) => {
    // const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
    // const fs = res.locals.fs;
    // const outputPath = res.locals.webpackStats.toJson().outputPath;

    // fs.readdirSync(outputPath).forEach(file => {
    //     console.log(file);
    // });

    const body = `<button id="loginButton">login</button>` +
        `<button id="showMenuButton">show menu</button>` +
        `<button id="logoutButton">logout</button>`;

    res.send(serverRender(body, ['vendor'], ['vendor', 'common', 'app']));
});

app.listen(3000, () => console.log('server on localhost:3000'));
