const gulp = require('gulp');
const pug = require('gulp-pug');


gulp.task('pug', function() {
  return gulp.src('views/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('views'));
});


gulp.task('watch', function() {
  gulp.watch('views/*.pug', gulp.parallel('pug'));
});

gulp.task('default', gulp.parallel('watch'));
