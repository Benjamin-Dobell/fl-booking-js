/*globals process, module, require*/

module.exports = function (grunt) {

  //Runs booking.js building routine.
  grunt.registerMultiTask('build-bookingjs',
    'Build booking-js.',
    function () {
      'use strict';

      if (!this.data.src) {
        throw Error('build-bookingjs: No src field provided in config.');
      }

      //Tell grunt this is an async task.
      var done = this.async();
      var rootDir = process.cwd();
      var bookingJsDir = this.data.src;
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
