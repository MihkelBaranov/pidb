"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repl = require("repl");
const index_1 = require("./index");
const args = process.argv;
const path = args[2] === "--path" && args[3] ? args[3] : "/var/tmp/pidb";
const replServer = repl.start({
    prompt: "pidb > ",
});
replServer.context.db = index_1.pidb.init(path);
