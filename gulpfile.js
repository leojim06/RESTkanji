"use strict"
const gulp = require('gulp');
const ts = require('gulp-typescript');
gulp.task('build:server', () => {
  gulp.src(['src/**/*.html', 'src/**/*.css']).pipe(gulp.dest('dist'));
  let tsProyect = ts.createProject('tsconfig.json');
  let tsResult = gulp.src('src/**/*.ts')
    .pipe(tsProyect());
  return tsResult.js
    .pipe(gulp.dest('dist'));
});
gulp.task('watch', ['build:server'], () => {
  gulp.watch('src/**/*.ts', ['build:server']);
});
gulp.task('default', ['watch']);