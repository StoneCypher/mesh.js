var mesh = require('../..');
var expect = require('expect.js');
var sift = require('sift');
var co = require('co');
var expect = require('expect.js');

var LimitBus = mesh.LimitBus;
var WrapBus  = mesh.WrapBus;

describe(__filename + '#', function() {

  it('can be created', function() {
    var bus = LimitBus.create();
  });

  it('can execute an action', co.wrap(function*() {
    var actions = [];
    var bus = LimitBus.create(1, WrapBus.create(function (action) {
      actions.push(action);
    }));

    bus.execute({ type: 'a' });
    expect(actions.length).to.be(1);
  }));

  it('only executes one action at a time', co.wrap(function*() {
    var actions = [];
    var bus = LimitBus.create(1, WrapBus.create(function (action) {
      actions.push(action);
    }));

    bus.execute({ type: 'a' });
    bus.execute({ type: 'a' });
    expect(actions.length).to.be(1);
  }));

  it('can limit to 2 actions at a time', co.wrap(function*() {
    var actions = [];
    var bus = LimitBus.create(2, WrapBus.create(function (action) {
      actions.push(action);
    }));

    bus.execute({ type: 'a' });
    bus.execute({ type: 'a' });
    bus.execute({ type: 'a' });
    expect(actions.length).to.be(2);
  }));

  it('executes all actions in queue', co.wrap(function*() {
    var actions = [];
    var bus = LimitBus.create(2, WrapBus.create(function (action) {
      actions.push(action);
    }));

    bus.execute({ type: 'a' });
    bus.execute({ type: 'a' });
    yield bus.execute({ type: 'a' });
    expect(actions.length).to.be(3);
    yield bus.execute({ type: 'a' });
    expect(actions.length).to.be(4);
  }));
});