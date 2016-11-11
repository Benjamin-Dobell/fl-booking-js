/*
npm install
karma
tmp
karma-jasmine
jasmine-core
karma-requirejs
karma-chrome-launcher
 */

const gulp = require('gulp');
const organiser = require('gulp-organiser');

const KarmaServer = require('karma').Server;
const tmp = require('tmp');
const fs = require('fs');

const generateConfig = require('./karma-generate-config');

module.exports = organiser.register((task) => {
  gulp.task(task.name, done => {
    // Create temporary configuration file
    const config = tmp.fileSync();
    fs.writeFileSync(config.name, generateConfig(task.src));

    return new KarmaServer({
      configFile: config.name,
      singleRun: task.singleRun !== 'undefined' ? task.singleRun : true,
    },
    function cleanUp() { // eslint-disable-line prefer-arrow-callback
      config.removeCallback();
      done();
    }).start();
  });
});
