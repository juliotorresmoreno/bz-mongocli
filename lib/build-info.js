

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

            conn.admin.buildInfo(function(err, data) {
                if (err) {
                    error(done)(err);
                    return;
                }
                fs.writeFileSync("C:\\Users\\user\\Desktop\\bz-mongo\\result.json", JSON.stringify(data))
                done(bzUtil.getResponse(data, null, 200, null));
            });
        });
    } catch (err) {
        error(done)(err);
    }
}.bind(null, {});

exports.invoke.description = `The buildInfo command is an administrative command which returns a build summary for the current mongod. ` +
                             `buildInfo has the following prototype form: { buildInfo: 1 }`;

exports.invoke.definition = [
    {
        "name": "database",
        "type": "string",
        "qty": "single"
    }
];
