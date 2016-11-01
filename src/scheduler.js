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

const scheduler = {
  configure() {},

  setUser() {},

  findTime(data) {
    return request('POST', urlPath('/findtime'), data);
  },

  getUserTimezone(data) {
    return request('GET', urlPath(`/users/timezone/?email=${data.email}`));
  },

  headers() {
    return this;
  },

  createBooking(data) {
    console.log('Creating booking with:');
    console.dir(data);
    return request('POST', urlPath('/bookings'), data);
  },
};

module.exports = scheduler;
