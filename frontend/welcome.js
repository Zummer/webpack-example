'use strict';

// declare const NODE_ENV: string;
// declare const USER: string;

const welcome = (message) => {
    if (NODE_ENV == 'development') {
        console.log(message);
    }

    console.log('user: ', USER);

    console.log(`Welcome ${message}`);
};

module.exports = welcome;
