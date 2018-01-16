

const globals = {
    authdata: {
        host: "192.168.0.84",
        port: "8000"
    }
}

const logger = {
    info: function() {

    }
}

exports.exec = function(invoke, data, definition, description) {
    invoke(globals, 'serverStatus', data, 'custom', logger, function(output) {
        console.log(JSON.stringify({
            input: data, 
            definition: definition, 
            description,
            output: output
        }, null, 4));
    });
}