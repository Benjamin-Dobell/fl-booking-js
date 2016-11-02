(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.sdl1478015358318 = factory());
}(this, (function () { 'use strict';

/* global moment */
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
    console.log(data);
    return request('GET', urlPath('/findtime'));
  },
  getUserTimezone: function getUserTimezone() {
    return Promise.resolve({
      data: {
        timezone: 'Europe/Stockholm',
        utc_offset: 1
      }
    });
  },
  include: function include() {
    return this;
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
