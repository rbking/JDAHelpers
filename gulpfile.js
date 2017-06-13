let gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

let jsTask = () => {
    gulp.src([`functions/main.js`, `functions/**/*.js`])
        .pipe($.concat('jdaHelper.concat.js'))
        .pipe(gulp.dest('./'))
        .pipe($.rename('jdaHelper.min.js'))
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe($.iife({
            useStrict: false
        }))
        .pipe($.uglify({ mangle: false }))
        .pipe(gulp.dest(`./`));
};
gulp.task('minAppJS', jsTask);
gulp.task('minAppJS-watch', jsTask);


gulp.task('watch', () => {
    gulp.watch('functions/**/*.js', ['minAppJS-watch']);
})
gulp.task('default', ['minAppJS', 'watch']);
