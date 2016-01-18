// gulp/tasks/build/fonts.js
'use strict';

// ----------------------------------
// available tasks: 
//    'gulp build:fonts' : main fonts task
// ----------------------------------
// config:
//     config.task.build : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // copy fonts to prod folder
    gulp.task(config.task.build + ':fonts', 'copy fonts to prod folder', function() {

        return gulp.src(path.to.fonts.dist.dev + '/**/*')
            .pipe(gulp.dest(path.to.fonts.dist.prod));

    });

};