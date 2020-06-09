const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();


// compile scss into css
function css(){
  return gulp.src('./assets/scss/main.scss')
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(concat('style.min.css'))
  .pipe(gulp.dest('./public/css'))
  
  .pipe(browserSync.stream());
}

function watch(){
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });

  gulp.watch('./assets/scss/**/*.scss',css)
  gulp.watch('./public/*.html').on('change',browserSync.reload);
  gulp.watch('./public/img').on('change',browserSync.reload);
  gulp.watch('./public/js/**/*.js').on('change',browserSync.reload);
}

exports.css = css;
exports.watch = watch;
