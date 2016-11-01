/* globals TimekitBooking, moment, xController, $LAB */
import assert from 'fl-assert';
import defaultConfig from './defaultConfig';

/**
 * Checks if an element or up to 4 of its parents have a class;
 * @function parentHasClass
 * @param  {String} className
 * @param  {HTMLElement} el
 * @param  {number} counter [optional]
 * @return {Boolean}
 */
function parentHasClass(className, el, counter = 0) { // eslint-disable-line complexity
  const maxIterations = 5;
  if (!el || !el.classList || counter >= maxIterations) {
    return false;
  }

  return el.classList.contains(className)
    ? true
    : parentHasClass(className, el.parentNode, counter + 1);
}

/**
 * Auto-complete calendar booking fields when data is available.
 * @function setAutoFillForm
 */
function setAutoFillForm(rootEl, name, email) {
  if (!(name && email)) {
    return;
  }

  rootEl.addEventListener('click', e => {
    if (!parentHasClass('fc-time-grid-event', e.target)) {
      return;
    }

    function fillValues() {
      const nameInput = document.querySelector('.bookingjs-form-input[name=name]');
      const emailInput = document.querySelector('.bookingjs-form-input[name=email]');

      if (nameInput && emailInput) {
        nameInput.value = name;
        emailInput.value = email;
      }
    }

    setTimeout(fillValues, 200);
  });
}


//------------------------------------------------------
// Controll scheduling widget
//------------------------------------------------------
xController(rootEl => {
  // Dependency check
  ['moment', 'jQuery'].forEach(dep => assert(window[dep], `Dependency ${dep} not found.`));

  function initBookingJs(targetEl) {
    const configuration = Object.assign({}, defaultConfig, { targetEl });
    new TimekitBooking().init(configuration);
  }

  function init() {
    window.APIGLOBAL = rootEl.dataset.api;
    initBookingJs(rootEl);
    setAutoFillForm(
      rootEl,
      rootEl.dataset.autofillUser,
      rootEl.dataset.autofillEmail
    );
  }

  init();
});
