## Slush Kickstart [![Build Status](https://travis-ci.org/mohamdio/slush-kickstart.svg?branch=master)](https://travis-ci.org/mohamdio/slush-kickstart)
A slush generator to scaffold front-end projects.
- [Features](https://github.com/mohamdio/slush-kickstart#features)
- [Getting Started](https://github.com/mohamdio/slush-kickstart#getting-started)
- [Getting To Know Slush](https://github.com/mohamdio/slush-kickstart#getting-to-know-slush)
- [Contributing](https://github.com/mohamdio/slush-kickstart#contributing)
- [Support](https://github.com/mohamdio/slush-kickstart#support)
- [License](https://github.com/mohamdio/slush-kickstart#license)

![slush kickstart](https://github.com/mohamdio/slush-kickstart/blob/master/screenshot.png "Slush Kickstart")

## Features
####Kickstart Features:
- Include foundation-sites framework
- Include bootstrap framework
- Include bootstrap v4.0.0-alpha (include sass)
- Include most of icon fonts libraries (fontAwesome, ionicons, typicons ..)
- Include all gulp workflow features below

####Gulp Workflow Features:
- Organized & splitting tasks files
- Using gulp-load-plugins
- Define tasks options & paths from one file
- Using bower to get dependencies
- Preview server with BrowserSync
- Cleans up file directories
- Plumber to handle gulp exceptions
- Sourcemaps for sass & js
- Sass compile with docs
- Js browserify & uglify
- Nunjucks templates
- Automagically inject css/js files
- Prettify html files
- Image optimization
- Generate favicons
- Concat css/js files
- & more, take a look at [Gulp Workflow](https://github.com/mohamdio/gulp-workflow#features) repo to know all features

All other features from [Gulp Workflow](https://github.com/mohamdio/gulp-workflow) repo founded in slush kickstart :
- [Gulp Tasks Structure](https://github.com/mohamdio/gulp-workflow#gulp-tasks-structure)
- [Available Tasks](https://github.com/mohamdio/gulp-workflow#available-tasks)
- [Folders Structure](https://github.com/mohamdio/gulp-workflow#folders-structure)

## Getting Started
- Install [Node.js](https://nodejs.org/)
- Install [Gulp](http://gulpjs.com/) & [Slush](http://slushjs.github.io/) & [bower](http://bower.io/) globally
```
npm install -g gulp slush bower
```
- Install `slush-kickstart` globally
```
npm install -g slush-kickstart
```
- In terminal/command line, `cd` into your project directory
- Run the generator to scaffold your project
```
slush kickstart
```
- OR run the generator with `--skip-install` to skips the automatic execution of bower and npm after scaffolding has finished like that
```
slush kickstart --skip-install
```
- After all done installing and scaffolding has finished, you can run gulp tasks:
    * `gulp` to run default tasks for development
    * `gulp build` to build your project for production
    * `gulp help` to get a listing of available tasks

## Getting To Know Slush

Slush is a tool that uses Gulp for project scaffolding.

Slush does not contain anything "out of the box", except the ability to locate installed slush generators and to run them with liftoff.

To find out more about Slush, check out the [documentation](https://github.com/slushjs/slush).

## Contributing

See the [CONTRIBUTING Guidelines](https://github.com/mohamdio/slush-kickstart/blob/master/CONTRIBUTING.md)

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/mohamdio/slush-kickstart/issues).

## License
The code is available under the [MIT License](https://github.com/mohamdio/slush-kickstart/LICENSE).