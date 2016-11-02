/* global moment */
/**
 *
 * This file replaces the original scheduler object used by Timekit.io
 * A compilation step substitutes the original reference to a reference
 * to this object.
 *
 */
function request(method, url, data) {
  const config = { method };

  if (method.toUpperCase() === 'POST') {
    config.body = JSON.stringify(data);
  }

  return fetch(url, config)
    .then((res) => res.json())
    .then((json) => json);
}

function getUserTimezone() {
  return Promise.resolve({
    data: {
      timezone: moment.tz.guess(),
      utc_offset: moment().utcOffset(),
    },
  });
}

let findTime = () => {};
let createBooking = () => {};

const scheduler = {
  configure() { return this; },
  setUser() { return this; },
  include() { return this; },
  headers() { return this; },
  getUserTimezone,
  findTime: data => Promise.resolve(findTime(data)), // to be overridden by controller
  createBooking: data => createBooking(data), // to be overridden by controller
  setFindTime(f) { findTime = f; },
  setCreateBooking(f) { createBooking = f; },
};

module.exports = scheduler;
