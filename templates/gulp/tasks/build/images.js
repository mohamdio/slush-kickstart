// gulp/tasks/build/images.js
'use strict';

// ----------------------------------
// available tasks: 
//    'gulp build:images' : main images task
// ----------------------------------
// config:
//     config.task.build : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // copy images to prod folder
    gulp.task(config.task.build + ':images', 'copy images to prod folder', function() {

        return gulp.src(path.to.images.dist.dev + '/**/*')
            .pipe(gulp.dest(path.to.images.dist.prod));

    });

};