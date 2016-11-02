// TODO: Make it compatible with IE9
const triggerEvent = (name, target, data) => {
  const e = new CustomEvent(name, { detail: data });
  target.dispatchEvent(e);
};


const api = {
  createBooking(container, data) {
    triggerEvent('createBooking', container, data);
    return true;
  },
};

export default api;
