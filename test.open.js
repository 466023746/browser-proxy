const {setBrowserProxy} = require('./index');

setBrowserProxy({
    http: {
        host: '127.0.0.2',
        port: '1001'
    },
    https: {
        host: '127.0.0.3',
        port: '8084'
    }
});