var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');

gulp.task('prepare', function() {
  browserify({
      entries : ['./src/js/main.js'],
      transform : [reactify],
  })
  .bundle()
  .pipe(source('main.js'))
  .pipe(gulp.dest('dist/js/'));
});

gulp.task('copy', function() {
    gulp.src('src/index.html')
      .pipe(gulp.dest('dist'));
});

gulp.task('default',['prepare', 'copy']);

gulp.task('watch', function() {
    gulp.watch('src/**/*.*', ['default']);
});
