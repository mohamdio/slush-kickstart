// gulp/tasks/build/css.js
'use strict';

// ----------------------------------
// available tasks: 
//    'gulp build:css' : main css task
// ----------------------------------
// plugins:
//     gulp-sourcemaps        : $.sourcemaps
//     gulp-minify-css        : $.minifyCss
//     gulp-rename            : $.rename
//     gulp-plumber           : $.plumber
//     gulp-concat            : $.concat
//     gulp-uncss             : $.uncss
//     gulp-filter            : $.filter
//     gulp-cssbeautify       : $.cssbeautify
//     gulp-strip-css-comments: $.stripCssComments
//     gulp-replace           : $.replace
// ----------------------------------
// config:
//     config.task.build : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // avoid writing sourcemaps of sourcemaps
    var filter = $.filter(['*.css', '!*.map'], {
        restore: true
    });

    // start css task
    gulp.task(config.task.build + ':css', 'build css files (beautify/concat/minify..)', function() {

        return gulp.src([
                // order css files for concat
                path.to.sass.dist.dev + '/vendor/*.css',
                path.to.sass.dist.dev + '/*.css',
                '!' + path.to.sass.dist.dev + '/**/_*{,/**}/'
            ])
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            // replace url references in css
            .pipe($.replace('url("../../fonts/', 'url("../fonts/'))
            // remove unused css selectors
            .pipe($.uncss(
                config.css.uncssOptions // options
            ))
            // strip unimportant css comments
            .pipe($.stripCssComments(
                config.css.stripCommentsOptions // options
            ))
            // beautify final css code
            .pipe($.cssbeautify(
                config.css.cssbeautifyOptions // options
            ))
            // initialize sourcemaps
            .pipe($.sourcemaps.init())
            // concat all css files
            .pipe($.concat('style.css'))
            // writing sourcemaps
            .pipe($.sourcemaps.write('./maps'))
            // dest unminified file
            .pipe(gulp.dest(path.to.sass.dist.prod))
            // filter css files
            .pipe(filter)
            // initialize sourcemaps before minify
            .pipe($.sourcemaps.init())
            // minify
            .pipe($.minifyCss(
                config.css.minifyCssOptions // options
            ))
            // rename files
            .pipe($.rename(
                config.css.renameOptions // options
            ))
            // writing sourcemaps for minified file
            .pipe($.sourcemaps.write('./maps'))
            // restoring filtered files
            .pipe(filter.restore)
            .pipe(gulp.dest(path.to.sass.dist.prod));

    });

};