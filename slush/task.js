// slush/task.js
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
    gutil    = require('gulp-util'),
    version  = 'v1.0.3';

// require questions
var questions = require('./questions');

// start default task
module.exports = function(options) {

    gulp.task('default', function(done) {

        // show welcome message
        gutil.log(
            '\n\n           . ----------------------------- .      \n'+
            '           |            '+gutil.colors.magenta('_--╱--_')+'            |     \n'+
            '           |           '+gutil.colors.magenta('| Slush |')+'           |     \n'+
            '           |            '+gutil.colors.magenta('|  ◼  |')+'            |     \n'+
            '           |             '+gutil.colors.magenta('|___|')+'             |     \n'+
            '           |                               |     \n'+
            '           |      ' + gutil.colors.yellow('Welcome to Kickstart')+'     |      \n'+
            '           |             ' + gutil.colors.blue(version)+'            |      \n'+
            '           . ----------------------------- .        \n'

        );

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
                    files.push(
                        '!' + options.templatesDir + '/source/scss/vendor/bootstrap.scss',
                        '!' + options.templatesDir + '/source/scss/vendor/bulma.scss',
                        '!' + options.templatesDir + '/source/templates/includes/bootstrap.nunjucks',
                        '!' + options.templatesDir + '/source/templates/includes/bulma.nunjucks'
                    );
                } else if (answers.cssFramework === 'bulma') {
                    files.push(
                        '!' + options.templatesDir + '/source/scss/vendor/bootstrap.scss',
                        '!' + options.templatesDir + '/source/scss/vendor/foundation-sites.scss',
                        '!' + options.templatesDir + '/source/templates/includes/bootstrap.nunjucks',
                        '!' + options.templatesDir + '/source/templates/includes/foundation.nunjucks'
                    );
                } else {
                    files.push(
                        '!' + options.templatesDir + '/source/scss/vendor/foundation-sites.scss',
                        '!' + options.templatesDir + '/source/scss/vendor/bulma.scss',
                        '!' + options.templatesDir + '/source/templates/includes/foundation.nunjucks',
                        '!' + options.templatesDir + '/source/templates/includes/bulma.nunjucks'
                    );
                }
                if (answers.iconFonts.indexOf('fontAwesome') === -1) {
                    files.push(
                        '!' + options.templatesDir + '/source/scss/vendor/font-awesome.scss'
                    );
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