/*
 * slush-kickstart
 * https://github.com/mohamdio/slush-kickstart
 * A slush generator to scaffold front-end projects
 *
 * Copyright (c) 2016, mohamdio
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    path = require('path');

function format(string) {
    var username = string.toLowerCase();
    return username.replace(/\s/g, '');
}

var defaults = (function() {
    var workingDirName = path.basename(process.cwd()),
        homeDir, osUserName, configFile, user;

    if (process.platform === 'win32') {
        homeDir = process.env.USERPROFILE;
        osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
    } else {
        homeDir = process.env.HOME || process.env.HOMEPATH;
        osUserName = homeDir && homeDir.split('/').pop() || 'root';
    }

    configFile = path.join(homeDir, '.gitconfig');
    user = {};

    if (require('fs').existsSync(configFile)) {
        user = require('iniparser').parseSync(configFile).user;
    }

    return {
        projectName: workingDirName,
        userName: osUserName || format(user.name || ''),
        authorName: user.name || '',
        authorEmail: user.email || ''
    };
})();

gulp.task('default', function(done) {
    var prompts = [{
        name: 'projectName',
        message: 'What is the name of your project?',
        default: defaults.projectName
    }, {
        name: 'projectDescription',
        message: 'What is the description?'
    }, {
        name: 'projectVersion',
        message: 'What is the version of your project?',
        default: '1.0.0'
    }, {
        name: 'authorName',
        message: 'What is the author name?',
        default: defaults.authorName
    }, {
        name: 'authorEmail',
        message: 'What is the author email?',
        default: defaults.authorEmail
    }, {
        name: 'authorUrl',
        message: 'What is the author url?'
    }, {
        name: 'userName',
        message: 'What is the github username?',
        default: defaults.userName
    }, {
        type: 'list',
        name: 'license',
        message: 'What is the project license? (use arrow keys select)',
        choices: ['MIT', 'BSD'],
        default: 'MIT'
    }, {
        type: 'list',
        name: 'cssFramework',
        message: 'What is the css framework want to use? (use arrow keys select)',
        choices: ['foundation-sites', 'bootstrap', 'bootstrap v4.0.0-alpha'],
        default: 'foundation-sites'
    }, {
        type: 'checkbox',
        name: 'iconFonts',
        message: 'Which icon fonts want to include? (use arrow keys and spacebar to select/deselect)',
        choices: [
            {
            name: 'Font Awesome',
            value: 'fontAwesome',
            checked: true
            }, {
            name: 'Foundation Icon Fonts',
            value: 'foundationIconFonts',
            }, {
            name: 'Ionicons',
            value: 'ionicons',
            }, {
            name: 'IcoMoon',
            value: 'icoMoon',
            }, {
            name: 'Octicons',
            value: 'octicons',
            }, {
            name: 'Typicons',
            value: 'typicons',
            }, {
            name: 'Devicons',
            value: 'devicons',
            }
        ]
    }, {
        type: 'confirm',
        name: 'moveon',
        message: 'Continue?'
    }];
    //Ask
    inquirer.prompt(prompts,
        function(answers) {
            if (!answers.moveon) {
                return done();
            }
            answers.projectNameSlug = _.slugify(answers.projectName);
            var d = new Date();
            answers.year = d.getFullYear();
            var files = [__dirname + '/templates/**'];
            if (answers.cssFramework === 'foundation-sites') {
                files.push('!' + __dirname + '/templates/source/scss/vendor/bootstrap.scss');
            } else {
                files.push('!' + __dirname + '/templates/source/scss/vendor/foundation-sites.scss');
            }
            if (!answers.fontAwesome) {
                files.push('!' + __dirname + '/templates/source/scss/vendor/font-awesome.scss');
            }
            gulp.src(files)
                .pipe(template(answers))
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
        });
});