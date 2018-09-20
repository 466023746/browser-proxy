# browser-proxy

auto set your browser proxy.

## Usage

```js
const {setBrowserProxy} = require('set-browser-proxy');

setBrowserProxy({
    // if don't specify this, won't open http proxy
    http: {
        host: '127.0.0.1',
        port: '3000'
    },
    // same as above
    https: {
        host: '127.0.0.3',
        port: '8084'
    }
});
```

maybe you need close the proxy after

```js
const {closeBrowserProxy} = require('set-browser-proxy');

closeBrowserProxy()

// or
closeBrowserProxy({
    http: false,        // if true, close http proxy, default true
    https: false        // same as above
});
```

## Demo

![example](https://haitao.nos.netease.com/ddc46b78-1039-40f0-bf1f-91a06bbb3dc2_652_506.jpg)