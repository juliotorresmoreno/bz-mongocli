

var _require = function (name) {
    return require(name);
}

var fs = require("fs");
var bzUtil = require('bz-util');
var MongoClient = _require('C:\\Users\\user\\Desktop\\driver').MongoClient;

var error = function (done) {
    return function (err) {
        var errorMessage = bzUtil.error(
            'GLB.EXCEPTION', [{
                error: err.message,
                status: 500,
                success: false
            }, 500, err.message]
        );

        done(bzUtil.getResponse(null, {
            error: err.message,
            status: 500,
            success: false
        }, 500, errorMessage));
    }
}

module.exports.invoke = function (deps, globals, actionName, data, authenticationType, logger, done) {
    fs.writeFileSync("C:\\Users\\admin\\projects\\mongodb-polyfill\\result.txt", new Date() + "\n")
    fs.appendFileSync("C:\\Users\\admin\\projects\\mongodb-polyfill\\result.txt", new Date() + JSON.stringify(globals) + "\n")
    //done(bzUtil.getResponse({ pid: 1 }, null, 200, null));
    //return
    try {
        var host = globals.authdata.host, 
            port = globals.authdata.port;
        if (!host) {
            error(done)(new Error("host not found"));
            return;
        }
        if (!port) {
            error(done)(new Error("port not found"));
            return;
        }
        fs.appendFileSync("C:\\Users\\admin\\projects\\mongodb-polyfill\\result.txt", new Date() + "\n")
        MongoClient({ host: host, port: port }, function(err, conn) {
            if (err) {
                error(done)(err);
                return;
            }
            conn.admin.serverStatus(function(err, data) {
                done(bzUtil.getResponse({ pid: 1 }, null, 200, null));
                fs.appendFileSync("C:\\Users\\admin\\projects\\mongodb-polyfill\\result.txt", new Date() + " " + JSON.stringify(data) + "\n")
                if (err) {
                    error(done)(err);
                    return;
                }
                fs.writeFileSync("C:\\Users\\admin\\projects\\mongodb-polyfill\\result.json", JSON.stringify(data) + "\n")
                //done(bzUtil.getResponse(data, null, 200, null));
            });
        });
    } catch (err) {
        error(done)(err);
    }
}.bind(null, {});



module.exports.invoke.description = 
    `The serverStatus command returns a document that provides an overview of the database’s state. ` +
    `Monitoring applications can run this command at a regular interval to collect statistics about the instance.`;

module.exports.invoke.definition = [
    {
        "name": "database",
        "type": "string",
        "qty": "single"
    }
];
