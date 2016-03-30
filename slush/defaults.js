// slush/defaults.js
'use strict';

// require plugins
var path      = require('path'),
    iniparser = require('iniparser'),
    fs        = require('fs');

// get default answers
function setDefaults() {

    function format(string) {
        var username = string.toLowerCase();
        return username.replace(/\s/g, '');
    }

    var workingDirName = path.basename(process.cwd()),
        homeDir, osUserName, configFile, user;

    if (process.platform === 'win32') {
        homeDir = process.env.USERPROFILE || '';
        osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
    } else {
        homeDir = process.env.HOME || process.env.HOMEPATH || '';
        osUserName = homeDir && homeDir.split('/').pop() || 'root';
    }

    configFile = path.join(path.resolve(homeDir), '.gitconfig');
    
    user = fs.existsSync(configFile) ? iniparser.parseSync(configFile).user : {};

    return {
        projectName: workingDirName,
        userName: osUserName || format(user.name || ''),
        authorName: user.name || '',
        authorEmail: user.email || ''
    };

}

module.exports = setDefaults();