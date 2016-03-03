/*globals process, module, require*/

module.exports = function (grunt) {
  'use strict';

  // Actually load this plugin's task(s).
  grunt.registerMultiTask('gitClone',
    'Build booking-js.',
    function () {
      var dest = this.data.dest;
      var repo = this.data.repo;

      if (!dest) {
        throw Error('gitClone: No "dest" variable in config.');
      } else if (!repo) {
        throw Error('gitClone: No "repo" variable in config.');
      }

      var match = repo.match(/^(.+\/)([^\/]+)\.git$/) || [];
      var repoName = match[2];
      if (!repoName) {
        throw Error('gitClone: Variable "repo" in config is not a valid git repository. (don\' forget the ".git" at the end)');
      }

      var fs = require('fs');
      var destContent = fs.readdirSync('./' + dest) || [];

      if (destContent.indexOf(repoName) >= 0) {
        grunt.log.writeln('gitClone: ' + dest +
        '/' + repoName + ' already exists. No need to clone it again.');
        return;
      }

      var rootDir = process.cwd();
      grunt.verbose.writeln('Current working directory: ' + rootDir);

      try {
        process.chdir(dest);
        grunt.verbose.writeln('Changed current working directory to: ' + process.cwd());

      } catch (e) {
        throw new Error('Error moving into "lib" directory');
      }

      //Tell grunt this is an async task.
      var done = this.async();
      grunt.log.writeln('------------------------------------------');
      grunt.log.writeln('Cloning ' + repo);

      var spawn = require('child-process-promise').spawn;
      spawn('git', ['clone', repo], { capture: ['stdout', 'stderr'] })
        .then(function (result) {
          grunt.log.writeln('[git clone] stdout: ', result.stdout.toString());
        })
        .fail(function (err) {
          grunt.log.error('[git clone] Error: ', err.stderr);
          throw err;
        })
        .finally(function () {

          //Go back to the root directory
          process.chdir(rootDir);
          grunt.verbose.writeln('Changed current working directory to: ' + process.cwd());
          //Finish our async task
          grunt.log.writeln(process.cwd());
          done();
        });
    });
};
