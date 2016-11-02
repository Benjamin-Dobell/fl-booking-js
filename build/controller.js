(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.flBooking = factory());
}(this, (function () { 'use strict';

// Bug checking function that will throw an error whenever
// the condition sent to it is evaluated to false
/**
 * Processes the message and outputs the correct message if the condition
 * is false. Otherwise it outputs null.
 * @api private
 * @method processCondition
 * @param  {Boolean} condition - Result of the evaluated condition
 * @param  {String} errorMessage - Message explainig the error in case it is thrown
 * @return {String | null}  - Error message if there is an error, nul otherwise.
 */
function processCondition(condition, errorMessage) {
  if (!condition) {
    var completeErrorMessage = '';
    var re = /at ([^\s]+)\s\(/g;
    var stackTrace = new Error().stack;
    var stackFunctions = [];

    var funcName = re.exec(stackTrace);
    while (funcName && funcName[1]) {
      stackFunctions.push(funcName[1]);
      funcName = re.exec(stackTrace);
    }

    // Number 0 is processCondition itself,
    // Number 1 is assert,
    // Number 2 is the caller function.
    if (stackFunctions[2]) {
      completeErrorMessage = stackFunctions[2] + ': ' + completeErrorMessage;
    }

    completeErrorMessage += errorMessage;
    return completeErrorMessage;
  }

  return null;
}

/**
 * Throws an error if the boolean passed to it evaluates to false.
 * To be used like this:
 * 		assert(myDate !== undefined, "Date cannot be undefined.");
 * @api public
 * @method assert
 * @param  {Boolean} condition - Result of the evaluated condition
 * @param  {String} errorMessage - Message explainig the error in case it is thrown
 * @return void
 */
function assert(condition, errorMessage) {
  var error = processCondition(condition, errorMessage);
  if (typeof error === 'string') {
    throw new Error(error);
  }
}

/**
 * Logs a warning if the boolean passed to it evaluates to false.
 * To be used like this:
 * 		assert.warn(myDate !== undefined, "No date provided.");
 * @api public
 * @method warn
 * @param  {Boolean} condition - Result of the evaluated condition
 * @param  {String} errorMessage - Message explainig the error in case it is thrown
 * @return void
 */
assert.warn = function warn(condition, errorMessage) {
  var error = processCondition(condition, errorMessage);
  if (typeof error === 'string') {
    console.warn(error);
  }
};

/* globals moment */

var defaultConfig = {
  targetEl: null,
  name: 'Book an interview',
  email: 'info@slvolunteers.com',
  calendar: 'Interviews',
  apiToken: 'xxx',
  showCredits: false,
  // Display and scroll to the first upcoming event in the calendar
  goToFirstEvent: false,
  // 'instant' 'confirm_decline'. Controls message after booking confirmation.
  bookingGraph: 'confirm_decline',
  fullCalendar: {
    weekends: false,
    businessHours: true,
    views: {
      agenda: {
        displayEventEnd: false,
        columnFormat: 'ddd\nMMM D'
      }
    }
  },
  timekitCreateBooking: {
    event: {
      // Default, you may want to customize this to a specific location,
      where: 'Online',
      // Inserted dynamically based on the host and visitors names
      // (you can replace it with a static string)
      what: 'Interview'
    },
    customer: {
      id: 'XXXXXXX user id XXXXXXXX',
      timezone: moment.tz.guess()
    }
  },
  avatar: 'avatar.jpg' };

/**
 * Checks if an element or up to 4 of its parents have a class;
 * @function parentHasClass
 * @param  {String} className
 * @param  {HTMLElement} el
 * @param  {number} counter [optional]
 * @return {Boolean}
 */
function parentHasClass(className, el) {
  var counter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  // eslint-disable-line complexity
  var maxIterations = 5;
  if (!el || !el.classList || counter >= maxIterations) {
    return false;
  }

  return el.classList.contains(className) ? true : parentHasClass(className, el.parentNode, counter + 1);
}

/**
 * Auto-complete calendar booking fields when data is available.
 * @function setAutoFillForm
 */
function setAutoFillForm(rootEl, name, email) {
  if (!(name && email)) {
    return;
  }

  rootEl.addEventListener('click', function (e) {
    if (!parentHasClass('fc-time-grid-event', e.target)) {
      return;
    }

    function fillValues() {
      var nameInput = document.querySelector('.bookingjs-form-input[name=name]');
      var emailInput = document.querySelector('.bookingjs-form-input[name=email]');

      if (nameInput && emailInput) {
        nameInput.value = name;
        emailInput.value = email;
      }
    }

    setTimeout(fillValues, 200);
  });
}

var utils = {
  setAutoFillForm: setAutoFillForm
};

/* globals TimekitBooking, moment, xController, $LAB */
//------------------------------------------------------
// Controll scheduling widget
//------------------------------------------------------
function flBooking() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  console.log('Self executing');
  // Dependency check
  ['moment', 'jQuery'].forEach(function (dep) {
    return assert(window[dep], 'Dependency ' + dep + ' not found.');
  });

  var autofillUser = config.autofillUser,
      autofillEmail = config.autofillEmail,
      targetEl = config.targetEl,
      createBooking = config.createBooking,
      getEvents = config.getEvents;

  // This string will be replaced by the actual id

  var scheduler = window['$$ scheduler id $$'];
  scheduler.setCreateBooking(createBooking);
  scheduler.setFindTime(getEvents);

  var configuration = Object.assign({}, defaultConfig, { targetEl: targetEl });
  new TimekitBooking().init(configuration);

  utils.setAutoFillForm(targetEl, autofillUser, autofillEmail);
}

return flBooking;

})));

//# sourceMappingURL=controller.js.map
