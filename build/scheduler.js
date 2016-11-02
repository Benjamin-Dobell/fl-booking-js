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
var _findTime = function findTime() {};
var _createBooking = function createBooking() {};
var userTimezone = {
  timezone: moment.tz.guess(),
  utc_offset: moment().utcOffset()
};

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

  getUserTimezone: function getUserTimezone() {
    return Promise.resolve({ data: userTimezone });
  },
  findTime: function findTime(data) {
    return Promise.resolve(_findTime(data));
  }, // to be overridden by controller
  createBooking: function createBooking(data) {
    return _createBooking(data);
  }, // to be overridden by controller
  setFindTime: function setFindTime(f) {
    _findTime = f;
  },
  setCreateBooking: function setCreateBooking(f) {
    _createBooking = f;
  },
  setUserTimezone: function setUserTimezone(tz) {
    userTimezone = tz;
  }
};

var scheduler_1 = scheduler;

return scheduler_1;

})));

//# sourceMappingURL=scheduler.js.map
