// gulp/tasks/default/sass.js
'use strict';

// ----------------------------------
// available tasks: 
//    'gulp sass'              : main sass task
//    'gulp sass:compile'      : compile scss to css
//    'gulp sass:doc'          : release sass docs
//    'gulp sass:cssRebaseUrl' : replace url in css
// ----------------------------------
// plugins:
//     gulp-sass        : $.sass
//     browser-sync     : $.browserSync
//     gulp-changed     : $.changed
//     gulp-newer       : $.newer
//     gulp-cached      : $.cached
//     gulp-sourcemaps  : $.sourcemaps
//     gulp-autoprefixer: $.autoprefixer
//     sassdoc          : $.sassdoc
//     lazypipe         : $.lazypipe
//     gulp-plumber     : $.plumber
//     gulp-filter      : $.filter
//     gulp-replace     : $.replace
// ----------------------------------
// config:
//     config.task.sass : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // split out commonly used stream chains [ changed - newer - cached ]
    var cacheFiles = $.lazypipe()
        // only pass through changed files
        .pipe($.changed, path.to.sass.dist.dev + '/**/*.css')
        // only pass through newer source files
        .pipe($.newer, path.to.sass.dist.dev + '/**/*.css')
        // start cache
        .pipe($.cached, 'sass');

    // compile sass task
    gulp.task(config.task.sass + ':compile', 'compile scss to css', function() {

        // avoid writing sourcemaps of sourcemaps
        var filter = $.filter(['*.css', '!*.map'], {
            restore: true
        });

        return gulp.src(path.to.sass.src)
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            // only pass through changed & newer & not cached files
            .pipe(cacheFiles())
            // initialize sourcemaps
            .pipe($.sourcemaps.init())
            // start compile
            .pipe($.sass(
                config.sass.options // options
            ))
            // writing sourcemaps
            .pipe($.sourcemaps.write('./_maps'))
            // filter css files
            .pipe(filter)
            // prefixing css
            .pipe($.autoprefixer())
            // restoring filtered files
            .pipe(filter.restore)
            .pipe(gulp.dest(path.to.sass.dist.dev))
            .pipe($.browserSync.reload({
                stream: true
            }));

    });

    // release sass docs task
    gulp.task(config.task.sass + ':doc', 'release sass docs', function() {

        return gulp.src(path.to.sass.src)
            // only pass through changed & newer & not cached files
            .pipe(cacheFiles())
            // start sassdoc
            .pipe($.sassdoc(
                config.sass.sassdocOptions // options
            ))
            .resume();

    });

    // replace url references in css
    gulp.task(config.task.sass + ':cssRebaseUrl', 'replace url references in css', function() {

        return gulp.src([
                path.to.sass.dist.dev + '/**/*.css',
                '!' + path.to.sass.dist.dev + '/*.css',
                '!' + path.to.sass.dist.dev + '/**/_*{,/**}/'
            ])
            // start replace
            .pipe($.replace('url("../fonts/', 'url("../../fonts/'))
            .pipe(gulp.dest(path.to.sass.dist.dev));

    });

    // main sass task
    gulp.task(config.task.sass, 'main sass task', function(cb) {

        $.runSequence(
            config.task.sass + ':compile',
            config.task.sass + ':doc',
            config.task.sass + ':cssRebaseUrl',
            cb
        )

    });

};