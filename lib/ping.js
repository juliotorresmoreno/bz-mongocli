
var _require = function(name) {
	return require(name);
}

var fs = require("fs");
var bzUtil = require('bz-util');
var MongoClient = _require('C:\\Users\\user\\Desktop\\driver').MongoClient;

var error = function(done) {
	return function(err) {
	    var errorMessage = bzUtil.error('GLB.EXCEPTION', [{
	        error: err.message,
	        status: 500,
	        success: false
	    }, 500, err.message]);

	    done(bzUtil.getResponse(null, {
	        error: err.message,
	        status: 500,
	        success: false
	    }, 500, errorMessage));
	}
}

module.exports.invoke = function(deps, globals, actionName, data, authenticationType, logger, done) {
    try {
        var user = data.inputs.input.user, 
            database = data.inputs.input.database;
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
        MongoClient({ host: host, port: port }, function(err, conn) {
            if (err) {
                error(done)(err);
                return;
            }

            conn.admin.ping(function(err, data) {
                if (err) {
                    error(done)(err);
                    return;
                }
                done(bzUtil.getResponse(data, null, 200, null));
            });
            
        });
    } catch (err) {
        error(done)(err);
        fs.writeFileSync("C:\\Users\\user\\Desktop\\bz-mongo\\result.txt", new Date() + " error: " + err.message);
    }
}.bind(null, {});

exports.invoke.description = `The ping command is a no-op used to test whether a server is responding to commands. ` +
                             `This command will return immediately even if the server is write-locked: { ping: 1 }`;

exports.invoke.definition = [
    {
        "name": "database",
        "type": "string",
        "qty": "single"
    }
];
