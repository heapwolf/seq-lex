var assert = require('assert').ok;
var lexseq = require('./index');
var level = require('level');
var rimraf = require('rimraf');

assert(typeof lexseq == 'function', 'module exports a function');
assert(lexseq().charCodeAt(0) == 33, 'no args returns single char of ascii value 33');

var seq = lexseq();

for(var i = 0; i <= 255 * 3; i++) {
  seq = lexseq(seq);
}

assert(seq.length == 4, 'after iterating 255*3 the length of the value should be 3');
assert(seq[0].charCodeAt(0) == 255, 'the first character should be 255');
assert(seq[1].charCodeAt(0) == 255, 'the second character should be 255');
assert(seq[2].charCodeAt(0) == 255, 'the third character should be 255');
assert(seq[3].charCodeAt(0) == 130, 'the third character should be 130');

function inc(n) {
  for (var i = 0; i < n || 0; i++) {
    seq = lexseq(seq);
  }
  return seq;
}

rimraf('./db', function(err) {

  var db = level('./db');
  var key = 0;
  var last;

  db.batch([
    { type: 'put', key: inc(), value: true },
    { type: 'put', key: inc(Math.random() * 200), value: true },
    { type: 'put', key: inc(Math.random() * 255), value: true }
  ], function(err) {

    assert(!err, 'the value was put to the database');

    db.createReadStream()
      .on('data', function(r) {
        if (last) {
          // strings in js are compared lexicographically
          // so as we read a forward stream each key should
          // be greater than the last.
          assert(r.key > last.key);
        }
        last = r;
      })
  });
});

