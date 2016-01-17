// slush/default/task.js
'use strict';

// require plugins
var gulp     = require('gulp'),
    install  = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename   = require('gulp-rename'),
    _        = require('underscore.string'),
    inquirer = require('inquirer'),
    filter   = require('gulp-filter'),
    gutil    = require('gulp-util');

// require questions
var questions = require('./questions');

// start default task
module.exports = function(options) {

    gulp.task('default', function(done) {

        // start asking & start task
        inquirer.prompt(questions,
            function(answers) {

                if (!answers.moveon) {
                    return done();
                }

                answers.projectNameSlug = _.slugify(answers.projectName);
                var d = new Date();
                answers.year = d.getFullYear();

                var files = [options.templatesDir + '/**'];
                if (answers.cssFramework === 'foundation-sites') {
                    files.push('!' + options.templatesDir + '/source/scss/vendor/bootstrap.scss');
                    files.push('!' + options.templatesDir + '/source/templates/includes/bootstrap.nunjucks');
                } else {
                    files.push('!' + options.templatesDir + '/source/scss/vendor/foundation-sites.scss');
                    files.push('!' + options.templatesDir + '/source/templates/includes/foundation.nunjucks');
                }
                if (answers.iconFonts.indexOf('fontAwesome') === -1) {
                    files.push('!' + options.templatesDir + '/source/scss/vendor/font-awesome.scss');
                }

                // avoid pass images and fonts through gulp-template
                var filterImagesAndFonts = filter(['**/**', '!source/fonts/**', '!source/images/**'], {
                    restore: true
                });

                gulp.src(files)
                    .pipe(filterImagesAndFonts) // remove the images and fonts
                    .pipe(template(answers))
                    .pipe(filterImagesAndFonts.restore) // restore the images and fonts
                    .pipe(rename(function(file) {
                        if (file.basename[0] === '_') {
                            file.basename = '.' + file.basename.slice(1);
                        }
                    }))
                    .pipe(conflict('./'))
                    .pipe(gulp.dest('./'))
                    .pipe(install())
                    .on('end', function() {
                        done();
                    });

            }
        );

    });

};