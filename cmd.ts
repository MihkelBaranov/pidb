import * as repl from "repl";
import { pidb } from "./index";

const args = process.argv;
const path = args[2] === "--path" && args[3] ? args[3] : "/var/tmp/pidb";

const replServer = repl.start({
	prompt: "pidb > ",
});

replServer.context.db = pidb.init(path);
