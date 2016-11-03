import moment from 'moment-timezone';
/**
 *
 * This file replaces the original scheduler object used by Timekit.io
 * A compilation step substitutes the original reference to a reference
 * to this object.
 *
 */
let findTime = () => {};
let createBooking = () => {};
let userTimezone = {
  timezone: moment.tz.guess(),
  utc_offset: moment().utcOffset(),
};

const scheduler = {
  configure() { return this; },
  setUser() { return this; },
  include() { return this; },
  headers() { return this; },
  getUserTimezone: () => Promise.resolve({ data: userTimezone }),
  findTime: data => Promise.resolve(findTime(data)), // to be overridden by controller
  createBooking: data => createBooking(data), // to be overridden by controller
  setFindTime(f) { findTime = f; },
  setCreateBooking(f) { createBooking = f; },
  setUserTimezone(tz) { userTimezone = tz; },
};

export default scheduler;
