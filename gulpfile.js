var gulp = require("gulp");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gulpSequence = require('gulp-sequence');
var babelify = require('babelify');
var babel = require('gulp-babel');

gulp.task('bundle', function() {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest("dist"));
});

gulp.task('build-demo', function() {
  // b = b.transform(babelify, {presets: ['env']});
  var b = browserify({
    entries: './demo/index.js',
    debug: false
  });
  return b.bundle()
    .pipe(source("index.build.js"))
    .pipe(buffer())
    .pipe(gulp.dest("demo"));
});

gulp.task('copy-css', function() {
  return gulp.src('./style.css')
    .pipe(gulp.dest('./demo'));
});

gulp.task("default", gulpSequence('bundle', 'build-demo', 'copy-css'));
