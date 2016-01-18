// gulp/tasks/default/fonts.js
'use strict';

// ----------------------------------
// available tasks: 
//    'gulp fonts' : main fonts task
// ----------------------------------
// plugins:
//     gulp-flatten : $.flatten
// ----------------------------------
// config:
//     config.task.fonts : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // copy fonts to dev folder
    gulp.task(config.task.fonts, 'copy fonts to dev folder', function() {

        return gulp.src(path.to.fonts.src)
            .pipe($.flatten()) // replace relative path for files
            .pipe(gulp.dest(path.to.fonts.dist.dev));

    });

};