/*
 * <%= appName %>
 * <%= appDescription %>
 * https://github.com/<%= userName %>/<%= appNameSlug %>
 *
 * Copyright (c) <%= year %>, <%= authorName %>
 * Licensed under the <%= license %> license.
 */

// gulpfile.js
'use strict';

// ----------------------------------
// available tasks: 
//    'gulp'
//    'gulp clean'
//          clean:cache - clean:prod
//    'gulp bower'
//          bower:clean - bower:scss - bower:js - bower:css - bower:fonts
//    'gulp fonts'
//    'gulp sass'
//          sass:compile - sass:doc - sass:cssRebaseUrl
//    'gulp js'
//          js:browserify - js:copySrc
//    'gulp images'
//          images:minify - images:favicons
//    'gulp nunjucks'
//          nunjucks:render - nunjucks:inject
//    'gulp serve'
//          serve:prod
//    'gulp watch'
//    'gulp build'
//          build:fonts - build:css - build:js - build:images - build:html
// ----------------------------------
// plugins:
//     gulp, run-sequence, gulp-util, gulp-plumber
//     gulp-load-plugins, gulp-load-subtasks
//     gulp-nunjucks-render, gulp-cssbeautify
//     gulp-sass, gulp-sourcemaps, browser-sync
//     gulp-prettify, gulp-newer, main-bower-files
//     gulp-flatten, del, gulp-inject, gulp-cached
//     gulp-autoprefixer, sassdoc, gulp-minify-css
//     gulp-rename, lazypipe, gulp-concat, gulp-uncss
//     gulp-strip-css-comments, gulp-filter, gulp-changed
//     browserify, vinyl-source-stream, vinyl-buffer 
//     gulp-uglify, watchify, lodash.assign, gulp-imagemin
//     imagemin-pngquant, gulp-favicons, gulp-replace
// ----------------------------------

// main gulp plugins
var gulp     = require('gulp'),
    path     = require('./gulp/paths.js'),
    config   = require('./gulp/config.js'),
    sequence = require('run-sequence'),
    $        = require('gulp-load-plugins')({
        // used for all plugins type not just with gulp-*
        pattern: '*',
        rename: {
			'lodash.assign': 'assign'
		}
    });

// require all tasks : gulp-load-subtasks
$.loadSubtasks('./gulp/tasks/**/*.js', $, path, config);

// common default tasks : for dev mode
gulp.task('default', function(cb) {
    sequence(
    	config.task.clean,
    	config.task.bower,
    	config.task.fonts,
        config.task.sass,
        config.task.scripts,
        config.task.images,
        config.task.nunjucks,
        config.task.browserSync,
        'watch',
        cb
    )
});

// build tasks : for prod mode
gulp.task(config.task.build, function(cb) {
    sequence(
    	config.task.clean + ':cache',
    	config.task.clean + ':prod',
    	config.task.build + ':fonts',
    	config.task.build + ':css',
    	config.task.build + ':js',
    	config.task.build + ':images',
    	config.task.build + ':html',
    	config.task.browserSync + ':prod',
        cb
    )
});