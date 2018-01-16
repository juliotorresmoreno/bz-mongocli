


const fs = require("fs");
const spawn = require('child_process').spawn;
const args = process.argv;

if (args.length < 3) {
    console.log("ruta no especificada");
    process.exit(0);
}

const path = args[2];
const silenct = args[3] === 'silenct';
const file = path.replace(/(.*\/|.*\\|\..*)/g, '');

function run_cmd(cmd, args, cb) {
    var child = spawn(cmd, args);
    child.stdout.on('data', function (data) {
        cb(data.toString("utf8"));
    });
}

const actions = require("../actions.json");

for (let i = actions.length - 1; i >= 0; i--) {
    if (actions[i].name === file) {
        actions.splice(i, 1);
    }
}

function type(val) {
    if (Array.isArray(val))
        return type(val[0]);
    if (Number.isInteger(val))
        return 'integer';
    if (typeof val === "boolean")
        return "boolean";
    if (typeof val === "string")
        return 'string';
}

const name = function(value) {
    return value.replace(/</, "(").replace(/>/, ")");
}

function map(output) {
    if (typeof output === "object") {
        return Object.keys(output).map((v) => {
            if (/(<|>)/.test(v)) return;
            var _type = type(output[v]);
            if (typeof output[v] === 'object') {
                if (!Array.isArray(output[v])) {
                    return {
                        name: name(v),
                        type: "object",
                        qty: 'single',
                        props: map(output[v]).filter(function(v) {
                            return !!v;
                        })
                    };
                } else {
                    if (output[v].length === 0) return;
                    if (_type === 'object')
                        return {
                            name: name(v),
                            type: _type,
                            qty: 'list',
                            props: map(output[v][0]).filter(function(v) {
                                return !!v;
                            })
                        };
                    return {
                        name: name(v),
                        type: _type,
                        qty: 'list'
                    };
                }
            }
            if (output[v].length === 0 && Array.isArray(output[v])) return;
            if (_type === undefined) return;
            return {
                name: name(v), 
                type: _type,
                qty: 'single'
            };
        }).filter(function(v) {
            return !!v;
        });
    }
}

run_cmd("node", [path], function (data) {
    if (silenct) return;
    const { input, output, definition, description } = JSON.parse(data);
    if (!output.success) return;
    const action = {
        name: file,
        description: description,
        inputs: definition,
        outputs: map(output.response.outputs.output)
    };
    actions.push(action);
    //console.log(action);
    fs.writeFileSync("./actions.json", JSON.stringify(actions, null, 4));
});