

var fs = require('fs')

var config = require('./bz.config.js')

var pack = require('./package.json')
pack.version = config.version;

var lock = require('./package-lock.json')
lock.version = pack.version;

fs.writeFileSync('./package-lock.json', JSON.stringify(lock, null, 4));


fs.writeFileSync('./package.json', JSON.stringify(pack, null, 4));