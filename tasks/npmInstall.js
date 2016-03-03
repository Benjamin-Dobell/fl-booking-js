/*globals process, module, require*/

module.exports = function (grunt) {
  'use strict';

  // Actually load this plugin's task(s).
  grunt.registerMultiTask('npmInstall',
    'Build booking-js.',
    function () {
      var dir = this.data.dir;

      if (!dir) {
        throw Error('npmInstall: No "dir" variable in config.');
      }

      var rootDir = process.cwd();
      grunt.verbose.writeln('Current working directory is: ' + process.cwd());

      try {
        process.chdir('./' + dir);
        grunt.verbose.writeln('Changed directory to: ' + dir);
      } catch (e) {
        throw new Error('npmInstall: Error moving into "' + dir + '""');
      }

      //Tell grunt this is an async task.
      var done = this.async();

      grunt.verbose.writeln('Running "npm install"');
      grunt.log.writeln('Installing dependencies... (This may take a little while)');
      var spawn = require('child-process-promise').spawn;
      spawn('npm', ['install'], { capture: ['stdout', 'stderr'] })
        .then(function (result) {
          grunt.log.writeln('[npmInstall] stdout: ', result.stdout.toString());
        })
        .fail(function (err) {
          grunt.log.error('[npmInstall] Error: ', err.stderr);
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
