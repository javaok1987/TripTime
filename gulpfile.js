// Modules & Plugins
// npm del gulp-concat gulp-connect gulp-minify-css gulp-notify gulp-rename gulp-uglify gulp-compass --save-dev
// gulp-gh-pages
var del = require('del'),
  gulp = require('gulp'),
  compass = require('gulp-compass'),
  concat = require('gulp-concat'),
  connect = require('gulp-connect'),
  minifycss = require('gulp-minify-css'),
  notify = require('gulp-notify'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  ghPages = require('gulp-gh-pages');


// Error Helper
function onError(err) {
  console.log(err);
}

// Server Task.
gulp.task('server', function() {
  connect.server({
    root: 'app/',
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src('app/*.html')
    .pipe(connect.reload());
});

// Scripts Task.
gulp.task('scripts', function() {
  gulp.src('scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('app/js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(connect.reload());
});

// Styles Task.
gulp.task('compass', function() {
  gulp.src('sass/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'app/css',
      sass: 'sass'
    }))
    .pipe(connect.reload());
});

// Watch Task.
gulp.task('watch', function() {
  gulp.watch('app/*.html', ['html']);
  gulp.watch('scripts/*.js', ['scripts']);
  gulp.watch('sass/*.scss', ['compass']);
}).on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type);
});

// Clean
gulp.task('clean', function(cb) {
  del(['app/css/**', 'app/js/**', '!app/css', '!app/js'], cb)
    .then(function(paths) {
      console.log('Deleted files/folders:\n', paths.join('\n'));
    })
    .then(cb);
});

// Default Task.
gulp.task('default', ['clean'], function() {
  // gulp.start('html', 'styles', 'scripts', 'server', 'watch');
  gulp.start('html', 'compass', 'scripts', 'server', 'watch');
});

// Deploy Task.
gulp.task('deploy', function() {
  gulp.src('./dist/**/*')
    .pipe(ghPages())
    .pipe(notify({
      message: 'Deploy task complete'
    }));
});
