const gulp = require('gulp')
const browserSync = require('browser-sync')
const inlineSource = require('gulp-inline-source');
const reload = browserSync.reload
const stream = browserSync.stream

gulp.task('default', ['inlinesource'], () => {

  browserSync.init({
    server: './dist'
  })
  
  gulp.watch('src/css/*.css', ['inlinesource'])
  gulp.watch('src/*.html', ['inlinesource'])
});

// gulp.task('html-watch', () => {
//   return gulp.src('src/*.html')
//     .pipe(gulp.dest('./dist'))
//     .pipe(browserSync.stream());
// })

gulp.task('inlinesource', () => {
  const options = {
    compress: false
  };

  return gulp.src('./src/*.html')
    .pipe(inlineSource(options))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
})
