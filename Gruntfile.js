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
        src: ['src/head.js', 'lib/modified-booking-js/dist/booking.js', 'src/scheduler_controller.js', 'src/tail.js'],
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
    uglify: {
      task: {
        files: {
          'dist/fl-booking.min.js': ['dist/fl-booking.js'],
        },
      },
    },
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('./tasks');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['build-bookingjs']);
  grunt.registerTask('build', ['copy-folder', 'npmInstall', 'prepare-bookingjs', 'build-bookingjs', 'concat', 'uglify']);
  grunt.registerTask('postinstall', ['gitClone', 'copy-folder', 'npmInstall']);
};
