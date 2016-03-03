module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    //Runs booking.js building routine.
    'build-bookingjs': {
      task: {
        src: '/lib/modified-booking-js',
      },
    },

    //Pulls from github and install
    'pull-and-install': {
      task: {
        repo: 'https://github.com/timekit-io/booking-js.git',
        dest: 'lib',
      },
    },

    // Replace booking.js dependency on Timekit API to a
    // dependency on an alternative scheduler function.
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

    //Copy a folder to a directory
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
  grunt.registerTask('build', ['copy-folder', 'prepare-bookingjs', 'build-bookingjs', 'concat']);
  grunt.registerTask('postinstall', ['pull-and-install']);
};
