var fs = require('fs');
var resizr = require('./index');
var rimraf = require('rimraf');
var spawn = require('child_process').spawn;
var base = __dirname + '/output';

describe('Resizr', function () {

  before(function (done) {
    
    rimraf.sync(base);
    fs.mkdirSync(base);

    var resize = resizr('100x150');
    var crs = fs.createReadStream('cow');
    var cws = fs.createWriteStream(base + '/cow');

    crs.pipe(resize);
    resize.pipe(cws);

    cws.on('close', done);

  });

  it('resizes the image to 100x150', function (done) {

    var args = [ '-' ];
    var identify = spawn('identify', args);
    
    fs.createReadStream(base + '/cow').pipe(identify.stdin);

    var data = [];

    identify.stdout.on('data', function (chunk) {
      data.push(chunk);
    });

    identify.stdout.on('end', function () {
      console.log(data.toString());
      data.toString().indexOf('100x150').should.not.eql(-1);
      done();
    });

  });

});

