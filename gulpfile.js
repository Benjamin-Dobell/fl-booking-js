// List all available tasks

const src = 'src';
const dest = 'dist';
const build = 'build';
const path = require('path');

// This is just a random number, so that we try not to pollute the global
// namespace too much.
const schedulerGlobalName = 'sdl1478015358318';

const organiser = require('gulp-organiser');
organiser.registerAll('./gulp-tasks', {
  'transpile-to-es5': {
    constroller: {
      src: path.join(src, 'controller.js'),
      dest: build,
    },
    scheduler: {
      src: 'src/scheduler.js',
      dest: build,
      config: {
        moduleName: schedulerGlobalName,
      },
    },
  },
  'modify-timekit-booking': {
    src: 'lib/timekit-booking/dist/booking.js',
    dest: build,
    schedulerGlobalName,
    outputName: 'modified-booking.js',
  },
  'link-dependencies': {
    dest: 'lib',
  },
  concat: {
    src: ['build/scheduler.js', 'build/modified-booking.js', 'build/controller.js'],
    dest,
    fileName: 'fl-booking.js',
  },
  build: {
    src: './',
    tasks: ['link-dependencies', 'modify-timekit-booking', 'transpile-to-es5', 'concat'],
  },
});
