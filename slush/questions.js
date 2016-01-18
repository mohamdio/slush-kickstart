// slush/default/questions.js
'use strict';

// require defaults
var defaults = require('./defaults');

// set questions
function setQuestions() {

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
        message: 'What is the project license?',
        choices: ['MIT', 'BSD'],
        default: 'MIT'
    }, {
        type: 'list',
        name: 'cssFramework',
        message: 'What is the css framework want to use?',
        choices: ['foundation-sites', 'bootstrap', 'bootstrap-v4.0.0-alpha'],
        default: 'foundation-sites'
    }, {
        type: 'checkbox',
        name: 'iconFonts',
        message: 'Which icon fonts want to include?',
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
        message: 'Continue?'
    }];

    return prompts;

}

module.exports = setQuestions();