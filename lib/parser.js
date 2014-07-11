'use strict';

var util      = require('util');
var Transform = require('stream').Transform;

function Parser() {
  Transform.apply(this, arguments);
}

util.inherits(Parser, Transform);

Parser.prototype._transform = function(data, encoding, done) {
  var data = data.toString();

  if (this.lastLine) {
    data = this.lastLine + data;
  }

  data = this.stripColors(data);

  var lines = data.split('\n');
  this.lastLine = lines.pop();
  this.processEntries(lines);

  done();
};

Parser.prototype.stripColors = function(data) {
  data = data.replace(/\\u001b\[[0-9;]*[mK]/g, '');
  data = data.replace(/\\r/g, '');
  data = data.replace(/\\n/g, '');
  return data;
};

Parser.prototype.processEntries = function(lines) {
  var self = this;

  lines.forEach(function(line) {
    var json = JSON.parse(line);
    var item = {
      '@message': json.log,
      '@timestamp': json.time,
      'container': 'foo',
      'app': 'foo'
    };
    self.push(JSON.stringify(item) + '\n');
  });
};

module.exports = Parser;
