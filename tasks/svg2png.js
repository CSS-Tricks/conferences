const gulp = require('gulp');
var svg2png = require('gulp-svg2png');

module.exports = function( done ) {
  gulp.src('./site/teasers/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./dist/teasers/'));
  done();
};