/* globals TimekitBooking, moment, xController, $LAB */
import assert from 'fl-assert';
import defaultConfig from './defaultConfig';
import utils from './utils';

//------------------------------------------------------
// Controll scheduling widget
//------------------------------------------------------
function flBooking(config = {}) {
  // Dependency check
  ['moment', 'jQuery'].forEach(dep => assert(window[dep], `Dependency ${dep} not found.`));

  const {
    autofillUser,
    autofillEmail,
    timezone,
    targetEl,
    createBooking,
    getEvents,
  } = config;

  assert(
    timezone && timezone.timezone && timezone.utc_offset,
    'Invalid timezone object'
  );

  // This string will be replaced by the actual id
  const scheduler = window['$$ scheduler id $$'];
  scheduler.setCreateBooking(createBooking);
  scheduler.setFindTime(getEvents);
  scheduler.setUserTimezone(timezone);

  const configuration = Object.assign({}, defaultConfig, { targetEl });
  new TimekitBooking().init(configuration);

  utils.setAutoFillForm(targetEl, autofillUser, autofillEmail);
}

export default flBooking;
