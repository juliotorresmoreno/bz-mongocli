

const api = require("C:\\Users\\admin\\projects\\mongodb-polyfill\\lib\\build-info.js");
const invoke = api.invoke;

const exec = require('./exec').exec;
const definition = invoke.definition;
const description = invoke.description;

const data = {
    inputs: {
        input: {

        }
    }
};

exec(invoke, data, definition, description);