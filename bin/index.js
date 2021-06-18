#! /usr/bin/env node
const yargs = require("yargs");
const { createProject, testCD } = require("./utils");
const utils = require("./utils");

var value = utils.parseSentence(yargs.argv._);
var cmd = utils.parseCommand(yargs.argv._)

console.log('cmd : ' + cmd, ' val : ' + value)

if (cmd == 'init') {
    createProject(value)
} else if (cmd == 'test') {
    testCD()
}

const usage = "\nUsage: ardx <lang_name> sentence to be translated";
const options = yargs
    .usage(usage)
    .option("l", {
        alias: "languages",
        describe: "List all supported languages.",
        type: "boolean",
        demandOption: false
    })
    .help(true)
    .argv;