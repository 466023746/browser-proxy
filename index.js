const {exec} = require('child_process');
const os = require('os');

const platform = os.platform();

async function setBrowserProxy(options = {}) {
    const {http, https} = options;
    let host, port;

    if (http) {
        host = http.host;
        port = http.port;
        await execCommand(http);
        console.log(`Set http proxy to ${host}:${port} successfully!`);
    }
    if (https && platform !== 'win32') {
        host = https.host;
        port = https.port;
        https.https = true;
        await execCommand(https);
        console.log(`Set https proxy to ${host}:${port} successfully!`);
    }

    return true
}

function execCommand(options = {}) {
    if (platform === 'win32') {
        return execCommandWin32.apply(this, arguments);
    } else {
        return execCommandOthers.apply(this, arguments);
    }
}

function execCommandWin32({host, port, close}) {
    return new Promise((resolve, reject) => {
        let cmd;

        if (close) {
            cmd = `reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable /t REG_DWORD /d 0 /f`;
        } else {
            cmd = `reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable /t REG_DWORD /d 1 /f && reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyServer /t REG_SZ /d ${host}:${port} /f`;
        }

        exec(cmd, (err, stdout, stderr) => {
            if (err) reject(err);

            resolve();
        })
    })
}

function execCommandOthers({host, port, https, close}) {
    return new Promise((resolve, reject) => {
        let cmd;

        if (close) {
            if (https) {
                cmd = `networksetup -setsecurewebproxystate "Wi-Fi" off`;
            } else {
                cmd = `networksetup -setwebproxystate "Wi-Fi" off`;
            }
        } else {
            if (https) {
                cmd = `networksetup -setsecurewebproxy 'Wi-Fi' ${host} ${port}`;
            } else {
                cmd = `networksetup -setwebproxy 'Wi-Fi' ${host} ${port}`;
            }
        }

        exec(cmd, (err, stdout, stderr) => {
            if (err) reject(err);

            resolve();
        })
    })
}

async function closeBrowserProxy(options = {}) {
    const {http = true, https = true} = options;
    let param = {
        close: true
    };

    if (http) {
        await execCommand(param);
        console.log(`Close http proxy successfully!`);
    }
    if (https && platform !== 'win32') {
        param.https = true;
        await execCommand(param);
        console.log(`Close https proxy successfully!`);
    }

    return true
}

module.exports.setBrowserProxy = setBrowserProxy;
module.exports.closeBrowserProxy = closeBrowserProxy;