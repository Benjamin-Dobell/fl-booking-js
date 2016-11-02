const hour = 1000 * 60 * 60;
const addHour = (date, amount) => new Date(date.valueOf() + amount * hour);
const toNearestHour = date => new Date(date.valueOf() - (date.valueOf() % hour));

window.createFakeEvents = (amount) => {
  const firstDate = toNearestHour(new Date());

  // Array of one thousand one-hour events
  const times = [...Array(amount)]
    .map((_, index) => {
      return {
        start: addHour(firstDate, index).toISOString(),
        end: addHour(firstDate, index + 1).toISOString(),
      };
    });

  return { data: times };
};
