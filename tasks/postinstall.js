/*globals process, module, require*/

module.exports = function (grunt) {
  'use strict';

  // Actually load this plugin's task(s).
  grunt.registerMultiTask('postinstall',
    'Build booking-js.',
    function () {
      var fs = require('fs');
      var rootDir = process.cwd();
      var libFolder = 'lib';
      var bookingjsGit = 'https://github.com/timekit-io/booking-js.git';

      try {
        process.chdir(libFolder);
      } catch (e) {
        throw new Error('Error moving into "lib" directory');
      }

      var folders = fs.readdirSync(process.cwd()) || [];

      if (folders.indexOf('booking-js') >= 0) {
        grunt.log.writeln('Postinstall script: ' + libFolder +
            '/booking-js already exists. No need to clone it again.');
        return;
      }

      //Tell grunt this is an async task.
      var done = this.async();
      grunt.log.writeln('------------------------------------------');
      grunt.log.writeln('Cloning ' + bookingjsGit);

      var spawn = require('child-process-promise').spawn;
      spawn('git', ['clone', bookingjsGit], { capture: ['stdout', 'stderr'] })
        .then(function (result) {
          grunt.log.writeln('[git clone] stdout: ', result.stdout.toString());

          grunt.log.writeln('------------------------------------------');
          grunt.log.writeln('Installing booking.js dependencies:');

          //Go into booking-js directory to execute the right command
          process.chdir('booking-js');
          return spawn('npm', ['install'], { capture: ['stdout', 'stderr'] });
        })
        .then(function (result) {
          grunt.log.writeln('[npm install] stdout: ', result.stdout.toString());
        })
        .fail(function (err) {
          grunt.log.error('Error: ', err.stderr);
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
