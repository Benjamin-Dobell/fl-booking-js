module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    'build-bookingjs': {
      task: {},
    },
    postinstall: {
      task: {},
    },
    concat: {
      options: {
        separator: '\n;',
      },
      dist: {
        src: ['lib/booking-js/.js', 'src/project.js', 'src/outro.js'],
        dest: 'dist/built.js',
      },
    },
    'string-replace': {
      dist: {
        files: {
          'dest/': 'src/**',
          'prod/': ['src/*.js', 'src/*.css'],
        },
        options: {
          replacements: [{
            pattern: /\/(asdf|qwer)\//ig,
            replacement: ''
            $1 ''
          }, {
            pattern: ',',
            replacement: ';'
          }]
        }
      }
    },
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('./tasks');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.registerTask('default', ['build-bookingjs']);
};
