// gulp/tasks/default/nunjucks.js
'use strict';

// ----------------------------------
// available tasks: 
//    'gulp nunjucks'       : main task
//    'gulp nunjucks:render': render nunjucks files
//    'gulp nunjucks:inject': inject css/js files
// ----------------------------------
// plugins:
//     gulp-nunjucks-render: $.nunjucksRender
//     browser-sync        : $.browserSync
//     gulp-changed        : $.changed
//     gulp-newer          : $.newer
//     gulp-inject         : $.inject
//     gulp-plumber        : $.plumber
//     gulp-prettify       : $.prettify
// ----------------------------------
// config:
//     config.task.nunjucks : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // render nunjucks files task
    gulp.task(config.task.nunjucks + ':render', 'render nunjucks files', function() {

        $.nunjucksRender.nunjucks.configure([path.to.nunjucks.config], {
            watch: false
        });
        return gulp.src(path.to.nunjucks.src)
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            // only pass through changed files
            .pipe($.changed(path.to.dist.dev + '*.html'))
            // only pass through newer source files
            .pipe($.newer(path.to.dist.dev + '*.html'))
            // start render
            .pipe($.nunjucksRender())
            // beautify HTML
            .pipe($.prettify(
                config.html.prettifyOptions // options
            ))
            .pipe(gulp.dest(path.to.dist.dev))
            .pipe($.browserSync.reload({
                stream: true
            }));

    });

    // inject css/js files task
    gulp.task(config.task.nunjucks + ':inject', 'inject css/js files', function() {

        return gulp.src(path.to.dist.dev + '*.html')
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            /**
             * CSS files
             */
            // inject vendor files
            .pipe($.inject(gulp.src(
                path.to.sass.dist.dev + '/vendor/**/*.css', {
                    read: false
                }), 
                config.nunjucks.injectCss.vendorOptions // options
            ))
            // inject main files
            .pipe($.inject(gulp.src(
                path.to.sass.dist.dev + '/*.css', {
                    read: false
                }), 
                config.nunjucks.injectCss.mainOptions // options
            ))
            /**
             * JS files
             */
            // inject main files
            .pipe($.inject(gulp.src(
                path.to.js.dist.dev + '/*.js', {
                    read: false
                }), 
                config.nunjucks.injectJs.options // options
            ))
            .pipe(gulp.dest(path.to.dist.dev))
            .pipe($.browserSync.reload({
                stream: true
            }));

    });

    // main nunjucks task
    gulp.task(config.task.nunjucks, 'main nunjucks task', function(cb) {

        $.runSequence(
            config.task.nunjucks + ':render',
            config.task.nunjucks + ':inject',
            cb
        )

    });

};