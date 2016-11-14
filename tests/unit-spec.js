/* eslint-env jasmine */
/* global flBooking, createFakeEvents */

describe('smoke tests', () => {
  it('flBooking should be defined', () => {
    expect(flBooking).toBeDefined();
  });

  it('should throw if instantiated without a config object', () => {
    expect(flBooking).toThrow();
  });

  it('shoud initiate propperly', () => {
    const init = () => flBooking({
      targetEl: document.createElement('div'),
      autofillUser: 'James',
      autofillEmail: 'james@brown.com',
      timezone: {
        timezone: 'Europe/London',
        utc_offset: 0,
      },
      // must return a promise
      createBooking: data => { console.log(data); return Promise.resolve(data); },
      getEvents: () => createFakeEvents(1000),
    });

    expect(init).not.toThrow();
  });
});

describe('fl-booking', () => {
  let wrapper;
  let container;

  beforeAll(() => {
    // Create a container and add it to the page
    wrapper = document.createElement('div');
    document.body.appendChild(wrapper);
  });

  beforeEach(() => {
    wrapper.innerHTML = '';
    container = document.createElement('div');
    wrapper.appendChild(container);
  });

  it('creates events', done => {
    flBooking({
      targetEl: container,
      autofillUser: 'James',
      autofillEmail: 'james@brown.com',
      timezone: {
        timezone: 'Europe/London',
        utc_offset: 0,
      },
      // must return a promise
      createBooking: data => { console.log(data); return Promise.resolve(data); },
      getEvents: () => createFakeEvents(1000),
    });


    setTimeout(() => {
      expect(
        container.querySelectorAll('.fc-event').length
      ).toBeGreaterThan(0);
      done();
    }, 1000);
  });
});
