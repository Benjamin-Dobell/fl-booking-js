const hour = 1000 * 60 * 60;
const addHour = (date, amount) => new Date(date.valueOf() + amount * hour);
const toNearestHour = date => new Date(date.valueOf() - (date.valueOf() % hour));

const createTimesObject = () => {
  const firstDate = toNearestHour(new Date());

  // Array of one thousand one-hour events
  const times = [...Array(1000)]
    .map((_, index) => {
      return {
        start: addHour(firstDate, index).toISOString(),
        end: addHour(firstDate, index + 1).toISOString(),
      };
    });

  return { data: times };
};

const timezoneObject = {
  data: {
    timezone: 'Europe/Stockholm',
    utc_offset: 1,
  },
};

const realFetch = window.fetch;
window.fetch = function fakeFetch(...args) {
  const url = args[0];

  if (url.includes('/findtime')) {
    return Promise.resolve({ json: () => createTimesObject() });
  }

  if (url.includes('/users/timezone')) {
    return Promise.resolve({ json: () => timezoneObject });
  }

  return realFetch(...args);
};
