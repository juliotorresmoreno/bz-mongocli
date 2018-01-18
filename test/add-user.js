
const api = require("C:\\Users\\admin\\projects\\mongodb-polyfill\\lib\\add-user.js");
const invoke = api.invoke;

const exec = require('./exec').exec;
const definition = invoke.definition;
const description = invoke.description;

const data = {
    inputs: {
        input: {
            user: "user01",
            pwd: "12345",
            role: "qe",
            database: "dfs"
        }
    }
};

exec(invoke, data, definition, description);