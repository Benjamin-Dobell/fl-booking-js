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

const urlPath = path => `${window.APIGLOBAL}${path}`;

function findTime() {
  return request('GET', urlPath('/findtime'));
}

function getUserTimezone() {
  return Promise.resolve({
    data: {
      timezone: moment.tz.guess(),
      utc_offset: moment().utcOffset(),
    },
  });
}


const listeners = [];
const scheduler = {
  configure() { return this; },
  setUser() { return this; },
  include() { return this; },
  headers() { return this; },
  findTime,
  getUserTimezone,
  createBooking: data => {
    const results = listeners.map(f => f(data));
    return Promise.all(results)[0];
  },
  onCreateBooking: f => listeners.push(f),
};

module.exports = scheduler;
