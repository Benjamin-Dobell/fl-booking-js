/*globals process, module, require*/

module.exports = function (grunt) {

  // Actually load this plugin's task(s).
  grunt.registerMultiTask('copy-folder',
    'Copy a folder recursively.',
    function () {
      'use strict';

      var src = this.data.src;
      var dest = this.data.dest;

      if (!src) {
        throw Error('copy-folder: No source folder provided.');
      } else if (!dest) {
        throw Error('copy-folder: No destination folder provided.');
      }

      // Tell Grunt it is an async task
      var done = this.async();

      var ncp = require('ncp').ncp;
      ncp.limit = 16;

      console.log('Copying files...');
      grunt.verbose.writeln('From: \t' + src);
      grunt.verbose.writeln('To:   \t' + dest);

      ncp(src, dest, function (err) {
        if (err) {
          return console.error(err);
        }

        console.log('Files copied.');

        //Finish the async task.
        done();
      });
    });
};
