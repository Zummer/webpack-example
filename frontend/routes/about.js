'use strict';

const home = () => {
    console.log('about route');
}

import(/* webpackChunkName: "menu" */ '../menu').then((res) => {
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

export default home;
