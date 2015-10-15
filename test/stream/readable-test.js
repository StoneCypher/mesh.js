var WritableStream = require('../../stream/writable');
var co = require('co');
var timeout = require('../utils/timeout');
var expect = require('expect.js');

describe(__filename + "#", function() {
  it('can pipe chunks to a writable', co.wrap(function*() {
    var w = WritableStream.create();
    var r = w.getReader();
    var chunks = [];
    var doneCalled = false;
    r.pipeTo({
      write: chunks.push.bind(chunks),
      end: function() {
        doneCalled = true;
      },
      abort: function(error) {

      }
    });
    w.write('a');
    w.write('b');
    w.write('c');
    w.end();
    yield timeout(0);
    expect(chunks.join('')).to.be('abc');
    expect(doneCalled).to.be(true);
  }));

  it('passes abort', co.wrap(function*() {
    var w = WritableStream.create();
    var r = w.getReader();
    var chunks = [];
    var doneCalled = false;
    var error;
    r.pipeTo({
      write: chunks.push.bind(chunks),
      end: function() {
        doneCalled = true;
      },
      abort: function(err) {
        error = err;
      }
    });
    w.write('a');
    w.write('b');
    w.write('c');
    w.abort(new Error('aborted'));
    yield timeout(0);
    expect(error.message).to.be('aborted');
    expect(chunks.join('')).to.be('a');
  }));
});