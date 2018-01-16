

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
    
}.bind(null, {});

exports.invoke.description = `Creates a new user for the database on which the method is run. ` +
                             `db.createUser() returns a duplicate user error if the user already exists on the database.`;

exports.invoke.definition = [
    {
        "name": "user",
        "type": "string",
        "qty": "single"
    }, 
    {
        "name": "pwd",
        "type": "string",
        "qty": "single"
    },
    {
        "name": "role",
        "type": "string",
        "qty": "single"
    },
    {
        "name": "database",
        "type": "string",
        "qty": "single"
    }
];
