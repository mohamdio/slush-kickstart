/*
 * slush-kickstart
 * https://github.com/mohamdio/slush-kickstart
 * A slush generator to scaffold front-end projects
 *
 * Copyright (c) 2016, mohamdio
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp');

// define options
var options = {
    templatesDir: __dirname + '/templates',
};

// require task
require('./slush/task')(options);