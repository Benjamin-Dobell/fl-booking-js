/*globals process, module, require*/
'use strict';

module.exports = function (grunt) {

  // Actually load this plugin's task(s).
  grunt.registerMultiTask('build-bookingjs',
    'Build booking-js.',
    function () {

      //Tell grunt this is an async task.
      var done = this.async();
      var rootDir = process.cwd();
      var bookingJsDir = 'lib/booking-js';
      try {
        process.chdir(bookingJsDir);
      } catch (e) {
        throw new Error('Error moving into booking-js directory');
      }

      var spawn = require('child-process-promise').spawn;
      spawn('node', ['node_modules/webpack/bin/webpack.js'], {
          capture: ['stdout', 'stderr'],
        })
        .then(function (result) {
          grunt.log.writeln('[spawn] stdout: ', result.stdout.toString());
        })
        .fail(function (err) {
          grunt.log.error('[spawn] stderr: ', err.stderr);
          throw err;
        })
        .finally(function () {

          //Go back to the root directory
          process.chdir(rootDir);

          //Finish our async task
          grunt.log.writeln(process.cwd());
          done();
        });
    });
};
