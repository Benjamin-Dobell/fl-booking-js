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

function findTime() {
  return request('GET', urlPath('/findtime'));
}

function getUserTimezone() {
  return Promise.resolve({
    data: {
      timezone: moment.tz.guess(),
      utc_offset: moment().utcOffset()
    }
  });
}

var listeners = [];
var scheduler = {
  configure: function configure() {
    return this;
  },
  setUser: function setUser() {
    return this;
  },
  include: function include() {
    return this;
  },
  headers: function headers() {
    return this;
  },

  findTime: findTime,
  getUserTimezone: getUserTimezone,
  createBooking: function createBooking(data) {
    return Promise.reject(listeners.map(function (f) {
      return f(data);
    })[0]);
  },
  onCreateBooking: function onCreateBooking(f) {
    return listeners.push(f);
  }
};

var scheduler_1 = scheduler;

return scheduler_1;

})));

//# sourceMappingURL=scheduler.js.map
