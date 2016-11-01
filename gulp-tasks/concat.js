const gulp = require('gulp');
const organiser = require('gulp-organiser');
const concat = require('gulp-concat');

module.exports = organiser.register((task) => {
  gulp.task(task.name, () => {
    return gulp.src(task.src)
    .pipe(concat(task.fileName))
    .pipe(gulp.dest(task.dest));
  });
});
