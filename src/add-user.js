
var spawn = require("child_process").spawn;
var bzUtil = require('bz-util');

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
    try {
        var nexe = require("mongodb-nexe");
        var params = { 
            command: 'add-user', 
            globals: globals,
            data: data.inputs.input
        };
        nexe(params, function (err, partial) {
            try {
                if (err) {
                    error(done)(new Error(err));
                    return;
                }
                data = JSON.parse(partial);
                if (!data.success) {
                    error(done)(new Error(data.error.Message));
                    return
                }
                done(bzUtil.getResponse({ data: data.data }, null, 200, null));
            } catch (e) {
                error(done)(e);
            }
        });
    } catch (e) {
        error(done)(e);
    }
}.bind(null, {});

module.exports.invoke.description =
    ``;

module.exports.invoke.definition = [
];
