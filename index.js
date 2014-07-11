'use strict';

var fs     = require('fs');
var net    = require('net');
var glob   = require('glob');
var async  = require('async');
var Parser = require('./lib/parser');

var argv = require('yargs')
  .default('glob', '/var/lib/docker/containers/*/*-json.log')
  .default('host', 'localhost')
  .default('port', '3000')
  .default('interval', 1000 * 30)
  .argv;

if (argv.help || argv.h) {
  help();
}

function getLogFiles(pattern, fn) {
  glob(pattern, fn);
}

function createLogstashConn(fn) {
  var parts = argv.host.split(':');
  return net.connect({host: parts[0], port: parts[1]}, fn);
}

function run() {
  getLogFiles(argv.glob, function(err, files) {

    files.forEach(function(file) {

      console.log(file);

      var rolledStream = fs.createWriteStream(file + '.rolled');
      var sourceStream = fs.createReadStream(file);
      var logstashConn = net.connect(argv.port, argv.host);

      sourceStream.pipe(rolledStream);
      sourceStream.pipe(new Parser()).pipe(logstashConn);

      sourceStream.on('end', function() {
        console.log('done reading');
        // fs.truncate(file, 0);
      });

    });

  });
}

setInterval(run, argv.interval);
run();

function help() {
  console.log('Streams Docker logs to Logstash. Wakes up every --sleep seconds to process Docker logs.');
  console.log('  Usage: ' + argv.$0 + ' --files <log-file-glob> --logstash <logstash-server:port>');
  process.exit();
};
