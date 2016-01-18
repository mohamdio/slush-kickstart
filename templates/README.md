##<%= projectName %> [![Build Status](https://travis-ci.org/<%= userName %>/<%= projectNameSlug %>.svg?branch=master)](https://travis-ci.org/<%= userName %>/<%= projectNameSlug %>)
<%= projectDescription %>
* [Features](https://github.com/<%= userName %>/<%= projectNameSlug %>#features)
* [Gulp Tasks Structure](https://github.com/<%= userName %>/<%= projectNameSlug %>#gulp-tasks-structure)
* [Getting Started](https://github.com/<%= userName %>/<%= projectNameSlug %>#getting-started)
* [Folders Structure](https://github.com/<%= userName %>/<%= projectNameSlug %>#folders-structure)
* [Configuration & Paths](https://github.com/<%= userName %>/<%= projectNameSlug %>#configuration--paths)
* [License](https://github.com/<%= userName %>/<%= projectNameSlug %>#license)

##Features
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
- & more, take a look at the gulp plugins used in [package.json](https://github.com/<%= userName %>/<%= projectNameSlug %>/blob/master/package.json)

##Gulp Tasks Structure
This is gulp folder structure:
- `config.js` file : to define tasks options
- `paths.js` file : to define all paths for tasks
- `base` folder : contain base tasks
- `default` folder : contain common tasks for development
- `build` folder : contain build tasks for production

```
gulp
├── config.js
├── paths.js
└── tasks
    ├── base
    │   ├── bower.js
    │   ├── clean.js
    │   ├── serve.js
    │   └── watch.js
    ├── build
    │   ├── css.js
    │   ├── fonts.js
    │   ├── html.js
    │   ├── images.js
    │   └── scripts.js
    └── default
        ├── fonts.js
        ├── images.js
        ├── nunjucks.js
        ├── sass.js
        └── scripts.js
```

##Getting Started
- Install [Node.js](https://nodejs.org/)
- Install [Gulp](http://gulpjs.com/) & [bower](http://bower.io/) globally 
```
npm install -g gulp bower
```
- In terminal/command line, `cd` into your project directory
- Clone this workflow 
```
git clone https://github.com/<%= userName %>/<%= projectNameSlug %>.git .
```
- Clone [source folder structure](https://github.com/mohamdio/gulp-source-structure) 
```
git clone https://github.com/mohamdio/gulp-source-structure.git source
```
- Install Gulp dependencies 
```
npm install
```
- Install front-end/bower dependencies 
```
bower install
```
- After all done installing, you can run tasks
  * `gulp` to run default tasks for development
  * `gulp build` to build your project for production
  * `gulp help` to get a listing of available tasks

####Available Tasks
Task Name | Subtasks | Description
--- | --- | ---
`clean` | `clean:cache` - `clean:prod` | clean dest folders (dev & prod) & caches :: [base/clean.js](https://github.com/<%= userName %>/<%= projectNameSlug %>/blob/master/gulp/tasks/base/clean.js)
`bower` | `bower:clean` - `bower:scss` - `bower:js` - `bower:css` - `bower:fonts` | dest all bower dependencies to source folder :: [base/bower.js](https://github.com/<%= userName %>/<%= projectNameSlug %>/blob/master/gulp/tasks/base/bower.js)
`fonts` | --- | copy all fonts to dev folder :: [default/fonts.js](https://github.com/<%= userName %>/<%= projectNameSlug %>/blob/master/gulp/tasks/default/fonts.js)
`sass` | `sass:compile` - `sass:doc` - `sass:cssRebaseUrl` | compile sass files with docs & rebase css url :: [default/sass.js](https://github.com/<%= userName %>/<%= projectNameSlug %>/blob/master/gulp/tasks/default/sass.js)
`js` | `js:browserify` - `js:copySrc` | browserify & uglify js files & copy source js files to dev folder :: [default/scripts.js](https://github.com/<%= userName %>/<%= projectNameSlug %>/blob/master/gulp/tasks/default/scripts.js)
`images` | `images:minify` - `images:favicons` | minify images & generate favicons :: [default/images.js](https://github.com/<%= userName %>/<%= projectNameSlug %>/blob/master/gulp/tasks/default/images.js)
`nunjucks` | `nunjucks:render` - `nunjucks:inject` | render nunjucks files & inject css/js files :: [default/nunjucks.js](https://github.com/<%= userName %>/<%= projectNameSlug %>/blob/master/gulp/tasks/default/nunjucks.js)
`serve` | `serve:prod` | start server & open browser for dev or prod mode :: [base/serve.js](https://github.com/<%= userName %>/<%= projectNameSlug %>/blob/master/gulp/tasks/base/serve.js)
`watch` | --- | start gulp watch for tasks (bower - sass - nunjucks - js) :: [base/watch.js](https://github.com/<%= userName %>/<%= projectNameSlug %>/blob/master/gulp/tasks/base/watch.js)
`build` | --- | main build task for prod mode
--- | `build:fonts` | copy fonts to prod folder :: [build/fonts.js](https://github.com/<%= userName %>/<%= projectNameSlug %>/blob/master/gulp/tasks/build/fonts.js)
--- | `build:css` | rebase url/remove unused selectors/strip comments/beautify/concat/minify :: [build/css.js](https://github.com/<%= userName %>/<%= projectNameSlug %>/blob/master/gulp/tasks/build/css.js)
--- | `build:js` | copy js files to prod folder :: [build/scripts.js](https://github.com/<%= userName %>/<%= projectNameSlug %>/blob/master/gulp/tasks/build/scripts.js)
--- | `build:images` | copy images to prod folder :: [build/images.js](https://github.com/<%= userName %>/<%= projectNameSlug %>/blob/master/gulp/tasks/build/images.js)
--- | `build:html` | copy & prettify html files and inject minified css/js files :: [build/html.js](https://github.com/<%= userName %>/<%= projectNameSlug %>/blob/master/gulp/tasks/build/html.js)

##Folders Structure
- `source` folder : contain all source files
- `build` folder : contain dest folders `dev` for development & `prod` for production
- `bower_components` folder : contain all bower dependencies
- `gulp` folder : contain all gulp tasks files
- `node_modules` folder : contain all gulp dependencies
- `bower.json` file : define bower dependencies
- `gulpfile.js` file : define gulp tasks for default & build
- `package.json` file : define gulp dependencies

```
gulp-workflow
├── bower_components
│   ├── # bower dependencies
├── gulp
│   ├── # gulp tasks
├── node_modules
│   ├── # Gulp dependencies
├── build
│   ├── dev
│   │   ├── assets
│   │   │   ├── css
│   │   │   │   ├── _maps
│   │   │   │   ├── _sassdoc
│   │   │   │   ├── base
│   │   │   │   ├── vendor
│   │   │   │   └── main.css
│   │   │   ├── fonts
│   │   │   │   ├── # all fonts
│   │   │   ├── images
│   │   │   │   ├── favicons
│   │   │   │   └── logo.png
│   │   │   └── js
│   │   │       ├── src
│   │   │       ├── scripts.js
│   │   │       └── scripts.js.map
│   │   └── index.html
│   └── prod
│       ├── assets
│       │   ├── css
│       │   │   ├── maps
│       │   │   ├── style.css
│       │   │   └── style.min.css
│       │   ├── fonts
│       │   │   ├── # all fonts
│       │   ├── images
│       │   │   ├── favicons
│       │   │   └── logo.png
│       │   └── js
│       │       ├── scripts.js
│       │       └── scripts.js.map
│       └── index.html
├── source
│   ├── fonts
│   │   └── vendor
│   │       └── # all vendor fonts
│   ├── images
│   │   └── logo.png
│   ├── js
│   │   ├── modules
│   │   │   └── module.js
│   │   ├── vendor
│   │   │   ├── # all vendors
│   │   └── main.js
│   ├── scss
│   │   ├── base
│   │   │   └── base.scss
│   │   ├── vendor
│   │   │   ├── lib
│   │   │   └── vendor.scss
│   │   └── main.scss
│   └── templates
│       ├── includes
│       ├── layouts
│       │   └── default.nunjucks
│       ├── macros
│       └── index.nunjucks
├── LICENSE
├── README.md
├── bower.json
├── gulpfile.js
└── package.json
```

##Configuration & Paths
- From [`gulp/config.js`](https://github.com/<%= userName %>/<%= projectNameSlug %>/blob/master/gulp/config.js) you can define tasks & plugins options without change anything in task file, example :
```javascript
// bower task mainBowerFiles options
    mainBowerFiles: {
        // main options
        options: {
            base: 'bower_components'
        },
        // bower:css rename options
        rename: {
            suffix: "-css",
            extname: '.scss'
        },
        // watch src
        watch: ['./bower_components/**', './bower.json']
    },
```

- From [`gulp/paths.js`](https://github.com/<%= userName %>/<%= projectNameSlug %>/blob/master/gulp/paths.js) you can define all paths for tasks, example :
```javascript
// base paths
var src    = './source/',
    dist   = './build/',
    dev    = 'dev/',
    prod   = 'prod/',
    assets = 'assets/';

// nunjucks files
        nunjucks: {
            config: src + 'templates/',
            src: src + 'templates/*.{html,nunjucks}',
            watch: src + 'templates/**/*.+(html|nunjucks)'
        },
```

##License
The code is available under the [<%= license %> License](https://github.com/<%= userName %>/<%= projectNameSlug %>/LICENSE).