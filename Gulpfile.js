const gulp = require('gulp')
const browserSync = require('browser-sync')
const inlineSource = require('gulp-inline-source')
const reload = browserSync.reload
const stream = browserSync.stream

gulp.task('default', ['webfonts', 'images', 'inlinesource'], () => {

  browserSync.init({
    server: './dist',
  })

  gulp.watch('./src/css/*.css', ['inlinesource'])
  gulp.watch('./src/*.html', ['inlinesource'])
})

gulp.task('inlinesource', () => {
  const options = {
    compress: false,
  }

  return gulp
    .src('./src/*.html')
    .pipe(inlineSource(options))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
})

gulp.task('webfonts', () => {
  return gulp
    .src('./src/fonts/*.{eot,ttf,svg,woff,woff2}')
    .pipe(gulp.dest('./dist/fonts'))
})

gulp.task('images', () => {
  return gulp
    .src('./src/img/*.{gif,jpg,jpeg,png,svg}')
    .pipe(gulp.dest('./dist/img'))
})
