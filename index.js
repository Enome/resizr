var fs = require('fs');
var spawn = require('child_process').spawn;

var resizr = function (size) {

  var args;

  if (size.indexOf('x') === -1) {
    args = ['-', '-resize', size + 'x', '-' ];
  } else {
    args = ['-', '-thumbnail', size + '^', '-gravity', 'center', '-extent', size, '-' ];
  }

  var convert = spawn('convert', args);

  convert.stdin.pipe = convert.stdout.pipe.bind(convert.stdout);
  return convert.stdin;

};

module.exports = resizr;
