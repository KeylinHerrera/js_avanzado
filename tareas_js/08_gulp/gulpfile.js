// Requires
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

// Basic syntax: task
gulp.task('hello', function() {
  console.log('Hello Zell');
});

// Compile Sass into CSS
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    // Converts Sass to CSS with gulp-sass
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Watching Sass files for changes
gulp.watch('app/scss/**/*.scss', ['sass']);

gulp.task('watch', ['browserSync', 'sass'],function(){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
})

//Browser Sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

//Concatenate CSS and JS files
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

//Add images in dist
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
  	  // Setting interlaced to true
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

//Add fonts in dist
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

// Clear dist folder
gulp.task('clean:dist', function() {
  return del.sync('dist');
  //return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
})

//Tasks to create the production website 
gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'useref', 'images', 'fonts'],
    callback
  )
})

//Task-one, task-two... Simultaneously tasks 
gulp.task('task-name', function(callback) {
  runSequence('task-one', ['tasks','two','run','in','parallel'], 'task-three', callback);
});

//Build Sequences
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})