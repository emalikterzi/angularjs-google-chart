//required modules
var
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    del = require('del');


gulp.task('build', build);
gulp.task('default', ['build'], watchAll);

var source = ['./src/chart.global.js', './src/chart.module.js', './src/core/**/*.js', './src/charts/*.js'];

function build() {
    return gulp.src(source)
        .pipe($.jsvalidate())
        .pipe($.concat('app.js'))
        .pipe($.ngAnnotate())
        .pipe(gulp.dest('./dist/'));
}

function watchAll() {

    $.livereload.listen();

    gulp.watch(source, ['build']);

    var livereloadDelay = 1500;
    var watchSource = [].concat(source);

    gulp
        .watch(watchSource)
        .on('change', function (event) {
            setTimeout(function () {
                $.livereload.changed(event.path);
            }, livereloadDelay);
        });


}