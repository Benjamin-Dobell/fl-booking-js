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

function toRemoteResponse(data) {
  return typeof data === 'string'
    ? new Response(data)
    : new Response(JSON.stringify(data));
}



const urlPath = path => `${window.APIGLOBAL}${path}`;

const scheduler = {
  configure() {},

  setUser() {},

  findTime(data) {
    console.log(data);
    return request('GET', urlPath('/findtime'));
  },

  getUserTimezone() {
    return Promise.resolve({
      data: {
        timezone: moment.tz.guess(),
        utc_offset: moment().utcOffset(),
      },
    });
  },

  include() {
    return this;
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
