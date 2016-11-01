/*globals TimekitBooking, moment, xController, $LAB */

//------------------------------------------------------
// Controll scheduling widget
//------------------------------------------------------
xController(function (rootEl) {
  'use strict';

  //Dependency check
  var dependencies = ['moment', 'jQuery'];
  dependencies.forEach(function (dep) {
    if (!window[dep]) {
      throw new Error('Dependency "' + dep + '" not found.');
    }
  });

  /**
   * Initialise the booking element with appropriate parameters
   * @function initBookingJs
   * @param {Object} config A configuration object
   * @return {void} [description]
   */
  function initBookingJs(targetEl, config) {
    var def = {
      name: 'Book an interview',
      targetEl: targetEl,
      email: 'info@slvolunteers.com',
      calendar: 'Interviews',
      apiToken: 'xxx',
      showCredits: false,
      goToFirstEvent: false, // Display and scroll to the first upcoming event in the calendar
      bookingGraph: 'confirm_decline', //'instant' 'confirm_decline'. Controls message after booking confirmation.
      fullCalendar: {
        weekends: false,
        businessHours: true,
        views: {
          agenda: {
            displayEventEnd: false,
            columnFormat: 'ddd\nMMM D',
          },
        },
      },
      timekitCreateBooking: {
        event: {
          where: 'Online', // Default, you may want to customize this to a specific location, TBD or whatever fits
          what: 'Interview', // Inserted dynamically based on the host and visitors names (you can replace it with a static string)
        },
        customer: {
          id: 'XXXXXXX user id XXXXXXXX',
          timezone: moment.tz.guess(),
        },
      },
      avatar: 'avatar.jpg', //This prevents the template from breaking
    };
    config = config || {};
    Object.keys(config).forEach(function (prop) {
      def[prop] = config[prop];
    });

    new TimekitBooking().init(def);
  }

  /**
   * Checks if an element or up to 4 of its parents have a class;
   * @function checkClassInParents
   * @param  {String} className
   * @param  {HTMLElement} el
   * @param  {number} counter [optional]
   * @return {Boolean}
   */
  function checkClassInParents(className, el, counter) {
    var maxIterations = 5;
    var val = true;
    counter = counter || 0;
    if (!el || !el.classList || counter >= maxIterations) {
      return false;
    }

    if (!el.classList.contains(className)) {
      val = checkClassInParents(className, el.parentNode, counter + 1);
    }

    return val;
  }

  /**
   * Auto-complete calendar booking fields when data is available.
   * @function setAutoFillForm
   */
  function setAutoFillForm() {
    rootEl.addEventListener('click', function (e) {
      if (checkClassInParents('fc-time-grid-event', e.target)) {
        setTimeout(function () {
          var name = document.querySelector('.bookingjs-form-input[name=name]');
          var email = document.querySelector('.bookingjs-form-input[name=email]');
          if (name && email) {
            name.value = 'John';
            email.value = 'asdf@adsf.com';

            // name.style.display = 'block';
            // email.style.display = 'block';
          }
        }, 200);
      }
    });
  }

  function init() {
    var baseFolder = document.currentScript.src.replace(/\/[^\/]+$/, '');
    window.APIGLOBAL = rootEl.dataset.api || 'http://localhost:8080'; //Global variable defined in head.js
    var config = rootEl.dataset.configObj;
    initBookingJs(rootEl, config);
    setAutoFillForm();

  }

  init();
});
