module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    //Runs booking.js building routine.
    'build-bookingjs': {
      task: {
        src: 'lib/modified-booking-js',
      },
    },

    //Clones from github
    gitClone: {
      task: {
        repo: 'https://github.com/timekit-io/booking-js.git',
        dest: 'lib',
      },
    },

    npmInstall: {
      task: {
        dir: 'lib/modified-booking-js',
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
        src: ['lib/modified-booking-js/dist/booking.min.js', 'src/scheduler_controller.js'],
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
  grunt.registerTask('build', ['prepare-bookingjs', 'build-bookingjs', 'concat']);
  grunt.registerTask('postinstall', ['gitClone', 'copy-folder', 'npmInstall']);
};
