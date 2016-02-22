// slush/default/questions.js
'use strict';

// require defaults
var defaults = require('./defaults');

// require gulp-util
var gutil = require('gulp-util');

// set questions
function setQuestions() {

    var prompts = [{
        name: 'projectName',
        message: gutil.colors.magenta('What is the name of your project?'),
        default: defaults.projectName
    }, {
        name: 'projectDescription',
        message: gutil.colors.magenta('What is the description?')
    }, {
        name: 'projectVersion',
        message: gutil.colors.magenta('What is the version of your project?'),
        default: '1.0.0'
    }, 
    // {
    //     name: 'authorName',
    //     message: gutil.colors.magenta('What is the author name?'),
    //     default: defaults.authorName
    // }, {
    //     name: 'authorEmail',
    //     message: gutil.colors.magenta('What is the author email?'),
    //     default: defaults.authorEmail
    // }, {
    //     name: 'authorUrl',
    //     message: gutil.colors.magenta('What is the author url?')
    // }, {
    //     name: 'userName',
    //     message: gutil.colors.magenta('What is the github username?'),
    //     default: defaults.userName
    // }, {
    //     type: 'list',
    //     name: 'license',
    //     message: gutil.colors.magenta('What is the project license?'),
    //     choices: ['MIT', 'BSD'],
    //     default: 'MIT'
    // }, 
    {
        type: 'list',
        name: 'cssFramework',
        message: gutil.colors.magenta('What is the css framework want to use?'),
        choices: ['foundation-sites', 'bootstrap', 'bootstrap-v4.0.0-alpha', 'bulma'],
        default: 'foundation-sites'
    }, {
        type: 'checkbox',
        name: 'iconFonts',
        message: gutil.colors.magenta('Which icon fonts want to include?'),
        choices: [{
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
        }]
    }, {
        type: 'confirm',
        name: 'moveon',
        message: gutil.colors.green('Continue?')
    }];

    return prompts;

}

module.exports = setQuestions();