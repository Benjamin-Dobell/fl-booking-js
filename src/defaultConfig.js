/* globals moment */

module.exports = {
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
        columnFormat: 'ddd\nMMM D',
      },
    },
  },
  timekitCreateBooking: {
    event: {
      // Default, you may want to customize this to a specific location,
      where: 'Online',
      // Inserted dynamically based on the host and visitors names
      // (you can replace it with a static string)
      what: 'Interview',
    },
    customer: {
      id: 'XXXXXXX user id XXXXXXXX',
      timezone: moment.tz.guess(),
    },
  },
  avatar: 'avatar.jpg', // This prevents the template from breaking
};
