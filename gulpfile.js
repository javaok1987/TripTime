//Modules
var del = require('del'),
  fs = require('fs'),
  sass = require('node-sass'),
  minifyCss = require('gulp-minify-css');

//gulp.js plugin registry.
var gulp = require('gulp'),
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
// var compass = require('gulp-compass');
// gulp.task('compass', function() {
//   gulp.src('sass/*.scss')
//     .pipe(compass({
//       config_file: './config.rb',
//       css: 'app/css',
//       sass: 'sass'
//     }))
//     .pipe(connect.reload());
// });

gulp.task('sass', function() {
  sass.render({
    file: 'sass/main.scss',
  }, function(err, result) {
    var _dir = 'app/css';
    if (!fs.existsSync(_dir)) {
      fs.mkdirSync(_dir);
    }
    fs.writeFile(_dir + '/main.css', result.css, function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
      gulp.src(_dir + '/main.css')
        .pipe(minifyCss())
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(gulp.dest(_dir))
        .pipe(connect.reload());
    });
  });
});

// Watch Task.
gulp.task('watch', function() {
  gulp.watch('app/*.html', ['html']);
  gulp.watch('scripts/*.js', ['scripts']);
  gulp.watch('sass/*.scss', ['sass']);
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
  gulp.start('html', 'sass', 'scripts', 'server', 'watch');
});

// Deploy Task.
gulp.task('deploy', function() {
  return gulp.src('./app/**/*')
    .pipe(ghPages());

});
