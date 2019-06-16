import jquery from "jquery";

const welcome = require('./welcome');
const old = require('old');


console.log(jquery('#logoutButton'));
old();
console.log(jQuery);

document.getElementById("showMenuButton").onclick = () => import(/* webpackChunkName: "menu" */ './menu').then((res) => {
    const Menu = res.default;
    let pandaMenu = new Menu({
        title: "Mеню панды",
        items: [{
            text: "Яйца",
            href: "#eggs"
        },{
            text: "Мясо",
            href: "#meat"
        },{
            text: "99% еды - бамбук!",
            href: "#bamboo"
        }]
    });

    document.body.appendChild(pandaMenu.elem);
});


console.log(welcome('welcome from app'));

let moduleName = location.pathname.slice(1);

// const context = require.context('./routes', false, /\.js$/);
// context.keys().forEach(path => {
//     let module = context(path);
//     module.default();
// });

let handler;

// try {
//     let context = require.context('bundle-loader!./routes', true, /^\.\//)
//     handler = context('./' + moduleName);
// } catch (e) {
//     alert('No such path');
// }
//
// if (handler) {
//     handler(function (route) {
//         route.default();
//     });
// }

import(/* webpackChunkName: "routes-" */ './routes/' + moduleName)
    .then(res => {
        let route = res.default;
        if (route) {
            route();
        }
    })
    .catch(err => {
        console.log('No such path!');
    });

document.getElementById("loginButton").onclick = () => import(/* webpackChunkName: "auth" */ './login').then(module => {
    console.log("script file is loaded");
    module.login();
}).catch(err => {
    console.log('Chunk loading failed');
});

document.getElementById("logoutButton").onclick = () => import(/* webpackChunkName: "auth" */ './logout').then(module => {
    console.log("script file is loaded");
    module.logout();
}).catch(err => {
    console.log('Chunk loading failed');
});
