const gulp = require('gulp')
const runSequence = require('run-sequence')
const browserSync = require('browser-sync')
const inlineSource = require('gulp-inline-source')
const clean = require('gulp-clean')
const imagemin = require('gulp-imagemin')
const htmlmin = require('gulp-htmlmin')
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

gulp.task('clean', () => {
  return gulp
    .src('./dist', { read: false })
    .pipe(clean())
})

gulp.task('imagemin', () => {
  return gulp
    .src('./src/img/*.{gif,jpg,jpeg,png,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
})

gulp.task('htmlmin', () => {
  return gulp
    .src('./dist/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      removeAttributeQuotes: true,
      minifyCSS: true,
      minifyURLs: true,
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('build', () => {
  return runSequence('clean', [
    'inlinesource',
    'webfonts',
    'imagemin'
  ], 'htmlmin')
})
