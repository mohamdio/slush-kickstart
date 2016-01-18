// gulp/tasks/base/clean.js
'use strict';

// ----------------------------------
// available tasks: 
//    'gulp clean'       : clean dest folder & caches
//    'gulp clean:prod'  : clean prod folder enough
//    'gulp clean:cache' : clear all caches enough
// ----------------------------------
// plugins:
//     del        : $.del
//     gulp-cached: $.cached
// ----------------------------------
// config:
//     config.task.clean : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // clear all caches enough
    gulp.task(config.task.clean + ':cache', 'clear all caches enough', function() {

        $.cached.caches = {};

    });

    // delete production folder [build/prod]
    gulp.task(config.task.clean + ':prod', 'delete production folder [build/prod]', function() {

        return $.del([
            path.to.dist.prod
        ]);

    });

    // delete dest folder [build] and clear all caches
    gulp.task(config.task.clean, 'delete dest folder [build] and clear all caches \n', [config.task.clean + ':cache', config.task.bower + ':clean'], function() {

        return $.del([
            path.to.dist.main,
            // this file created from images:favicons task
            // in source/templates/includes/ >> default [favicons.nunjucks]
            config.images.faviconsOptions.html
        ]);

    });

};