// gulp/tasks/default/images.js
'use strict';

// ----------------------------------
// available tasks: 
//    'gulp images'          : main images task
//    'gulp images:minify'   : minify images
//    'gulp images:favicons' : generate favicons
// ----------------------------------
// plugins:
//     gulp-imagemin    : $.imagemin
//     gulp-changed     : $.changed
//     gulp-newer       : $.newer
//     gulp-plumber     : $.plumber
//     imagemin-pngquant: $.pngquant
//     gulp-favicons    : $.favicons
// ----------------------------------
// config:
//     config.task.images : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // require the ES5 file from gulp-favicons 
    var favicons = require('gulp-favicons/es5');

    // minify images task
    gulp.task(config.task.images + ':minify', 'minify images', function() {

        return gulp.src(path.to.images.src)
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            // only pass through changed files
            .pipe($.changed(path.to.images.dist.dev + '/**/*'))
            // only pass through newer source files
            .pipe($.newer(path.to.images.dist.dev + '/**/*'))
            // minify images
            .pipe($.imagemin(
                config.images.imageminOptions // options
            ))
            .pipe(gulp.dest(path.to.images.dist.dev));

    });

    // generate favicons task
    gulp.task(config.task.images + ':favicons', 'generate favicons', function() {

        return gulp.src(path.to.images.logo)
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            // generate favicons
            .pipe(favicons(
                config.images.faviconsOptions // options
            ))
            .pipe(gulp.dest(path.to.images.dist.favicons));

    });

    // main images task
    gulp.task(config.task.images, 'main images task', function(cb) {

        $.runSequence(
            config.task.images + ':minify',
            config.task.images + ':favicons',
            cb
        )

    });

};