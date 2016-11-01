(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.sdl1478015358318 = factory());
}(this, (function () { 'use strict';

/**
 *
 * This file replaces the original scheduler object used by Timekit.io
 * A compilation step substitutes the original reference to a reference
 * to this object.
 *
 */

function request(method, url, data) {
  var config = { method: method };

  if (method.toUpperCase() === 'POST') {
    config.body = JSON.stringify(data);
  }

  return fetch(url, config).then(function (res) {
    return res.json();
  }).then(function (json) {
    return json;
  });
}

var urlPath = function urlPath(path) {
  return '' + window.APIGLOBAL + path;
};

var scheduler = {
  configure: function configure() {},
  setUser: function setUser() {},
  findTime: function findTime(data) {
    return request('POST', urlPath('/findtime'), data);
  },
  getUserTimezone: function getUserTimezone(data) {
    return request('GET', urlPath('/users/timezone/?email=' + data.email));
  },
  headers: function headers() {
    return this;
  },
  createBooking: function createBooking(data) {
    console.log('Creating booking with:');
    console.dir(data);
    return request('POST', urlPath('/bookings'), data);
  }
};

var scheduler_1 = scheduler;

return scheduler_1;

})));

//# sourceMappingURL=scheduler.js.map
