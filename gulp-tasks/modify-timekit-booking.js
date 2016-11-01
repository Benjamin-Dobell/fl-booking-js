const gulp = require('gulp');
const organiser = require('gulp-organiser');
const replace = require('gulp-replace');
const rename = require('gulp-rename');

module.exports = organiser.register((task) => {
  gulp.task(task.name, () => {
    return gulp.src(task.src)
    .pipe(replace(
      /var\s+timekit\s+=[^;]+/,
      `var timekit = window["${task.schedulerGlobalName}"]`
    ))
    .pipe(rename(task.outputName))
    .pipe(gulp.dest(task.dest));
  });
});
