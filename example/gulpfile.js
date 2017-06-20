var gulp = require('gulp');
var pug = require('gulp-pug');
var less = require('gulp-less');

gulp.task('html', function () {
  return gulp.src('./src/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./'))
});

gulp.task('css', function () {
  return gulp.src('./src/*.less')
    .pipe(less())
    .pipe(gulp.dest('./'))
});

gulp.task('default', ['html', 'css']);
