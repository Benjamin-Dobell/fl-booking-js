/*globals process, module, require*/

module.exports = function (grunt) {

  /**
   * It replaces the dependency on Timekit API to a dependency on an alternative
   * scheduler function.
   * @function preapre-bookingjs task
   */
  grunt.registerMultiTask('prepare-bookingjs',
    'Build booking-js.',
    function () {
      'use strict';

      var src = this.data.src;
      var schedulerAPI = this.data.schedulerAPI;

      if (!src) {
        throw Error('prepare-bookingjs: No source file provided in config.');
      } else if (!schedulerAPI) {
        throw Error('prepare-bookingjs: No schedulerAPI file provided in config.');
      }

      var match = src.match(/^(.+\/)([^\/]+)$/) || [];
      var srcFolder = match[1];
      var srcFileName = match[2];

      match = schedulerAPI.match(/^(.+\/)([^\/]+)$/) || [];
      var schedulerFolder = match[1];
      var schedulerFileName = match[2];

      if (!srcFolder || !srcFileName) {
        throw Error('prepare-bookingjs: Invalid "src" address in config.');
      } else if (!schedulerFolder || !schedulerFileName) {
        throw Error('prepare-bookingjs: Invalid "schedulerAPI" address in config.');
      }

      var fs = require('fs');

      grunt.log.writeln('Copying ' + schedulerAPI + ' to ' + srcFolder + schedulerFileName);

      //Copy schedulerAPI file to src folder;
      var schedulerFileContent = fs.readFileSync(schedulerAPI, 'utf8');
      fs.writeFileSync(srcFolder + schedulerFileName, schedulerFileContent, 'utf8');

      grunt.verbose.writeln('Reading from ' + src);

      //Replate timekit api in src file
      var bookingjsFileContent = fs.readFileSync(src, 'utf8');

      var modifiedBookingjsFileContent = bookingjsFileContent.replace(/var\s+timekit\s+=[^;]+/,
        'var timekit = require("./' + schedulerFileName + '")');

      grunt.log.writeln('Modifying ' + src);

      fs.writeFileSync(src, modifiedBookingjsFileContent, 'utf8');
    });
};
