// gulp/tasks/default/scripts.js
'use strict';

// ----------------------------------
// available tasks: 
//    'gulp js'            : main js task
//    'gulp js:browserify' : browserify task
//    'gulp js:copySrc'    : copy source js files
// ----------------------------------
// plugins:
//     browserify         : $.browserify
//     vinyl-source-stream: $.vinylSourceStream
//     vinyl-buffer       : $.vinylBuffer
//     watchify           : $.watchify
//     browser-sync       : $.browserSync
//     gulp-sourcemaps    : $.sourcemaps
//     lodash.assign      : $.assign
//     gulp-uglify        : $.uglify
// ----------------------------------
// config:
//     config.task.scripts : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // custom browserify options
    var customOpts = {
        entries: path.to.js.src.main,
        debug: true
    };
    var opts = $.assign({}, $.watchify.args, customOpts);
    var b = $.watchify($.browserify(opts));

    // browserify task
    gulp.task(config.task.scripts + ':browserify', 'browserify js files', bundle);

    // watchify update
    b.on('update', bundle);

    // output build logs to terminal
    b.on('log', $.util.log);

    // browserify function
    function bundle() {
        return b.bundle()
            .on('error', config.error)
            .pipe($.vinylSourceStream('scripts.js'))
            .pipe($.vinylBuffer())
            .pipe($.sourcemaps.init({
                loadMaps: true
            }))
            .pipe($.uglify())
            .on('error', config.error)
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest(path.to.js.dist.dev))
            .pipe($.browserSync.reload({
                stream: true
            }));
    }

    // copy source js files to build/dev
    gulp.task(config.task.scripts + ':copySrc', 'copy source js files to build/dev', function() {

        return gulp.src(path.to.js.src.copy)
            .pipe(gulp.dest(path.to.js.dist.dev + '/src'));

    });

    // main js task
    gulp.task(config.task.scripts, 'main js task', function(cb) {

        $.runSequence(
            config.task.scripts + ':browserify',
            config.task.scripts + ':copySrc',
            cb
        )

    });

};