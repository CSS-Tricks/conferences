const gulp = require('gulp');
const svg2png = require('gulp-svg2png');
const rename = require('gulp-rename');

module.exports = function(done) {
  gulp
    .src('./dist/teasers/svg/*.svg')
    .pipe(svg2png())
    .pipe(
      rename(function(path) {
        // trying to remove single quote, like in conference name Script'19
        path.basename = path.basename.replace(/\'/g, '');
      })
    )
    .pipe(gulp.dest('./dist/teasers/png'));
  done();
};
