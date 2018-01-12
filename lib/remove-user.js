
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
        if (!user) {
            error(done)(new Error("User not found"));
            return;
        }
        if (!database) {
            error(done)(new Error("Database not found"));
            return;
        }
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
            conn.removeUser(user, database, function(err, data) {
                if (err) {
                    logger.info(error)
                    error(done)(err);
                    return;
                }
                done(bzUtil.getResponse({response: 'ok'}, null, 200, null));
            });
        });
    } catch (err) {
        error(done)(err);
    }
}.bind(null, {});
