// gulp/tasks/base/serve.js
'use strict';

// ----------------------------------
// available tasks: 
//    'gulp serve'      : start server & open browser
//    'gulp serve:prod' : start server for production
// ----------------------------------
// plugins:
//     browser-sync : $.browserSync
// ----------------------------------
// config:
//     config.task.browserSync : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    gulp.task(config.task.browserSync, 'start server & open browser', function() {
        $.browserSync(
            config.serve.dev // options
        )
    });

    gulp.task(config.task.browserSync + ':prod', 'start server for production', function() {
        $.browserSync(
            config.serve.prod // options
        )
    });

};