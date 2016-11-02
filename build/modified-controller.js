(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
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

// TODO: Make it compatible with IE9
var triggerEvent = function triggerEvent(name, target, data) {
  var e = new CustomEvent(name, { detail: data });
  target.dispatchEvent(e);
};

var api = {
  createBooking: function createBooking(container, data) {
    triggerEvent('createBooking', container, data);
    return true;
  }
};

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/* globals TimekitBooking, moment, xController, $LAB */
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

//------------------------------------------------------
// Controll scheduling widget
//------------------------------------------------------
xController(function (rootEl) {
  // Dependency check
  ['moment', 'jQuery'].forEach(function (dep) {
    return assert(window[dep], 'Dependency ' + dep + ' not found.');
  });

  // This string will be replaced by the actual id
  var scheduler = window['sdl1478015358318'];
  scheduler.onCreateBooking.apply(scheduler, toConsumableArray(function (args) {
    return api.createBooking.apply(api, [rootEl].concat(toConsumableArray(args)));
  }));

  window.APIGLOBAL = rootEl.dataset.api;
  var configuration = Object.assign({}, defaultConfig, { targetEl: rootEl });
  new TimekitBooking().init(configuration);
  setAutoFillForm(rootEl, rootEl.dataset.autofillUser, rootEl.dataset.autofillEmail);
});

})));

//# sourceMappingURL=controller.js.map
