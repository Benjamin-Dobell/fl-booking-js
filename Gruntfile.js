module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    'build-bookingjs': {
      task: {
        src: '/lib/modified-booking-js',
      },
    },
    postinstall: {
      task: {},
    },
    'prepare-bookingjs': {
      task: {
        src: 'lib/modified-booking-js/src/main.js',
        schedulerAPI: 'src/FLScheduler.js',
      },
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/FLScheduler.js', 'dist/modified-booking.js', 'src/scheduler_controller.js'],
        dest: 'dist/fl-booking.js',
      },
    },
    'copy-folder': {
      task: {
        src: 'lib/booking-js',
        dest: 'lib/modified-booking-js',
      },
    },
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('./tasks');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['build-bookingjs']);
  grunt.registerTask('build', ['prepare-bookingjs', 'concat']);
};
