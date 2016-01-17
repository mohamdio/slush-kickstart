// gulp/config.js
'use strict';

// require gulp-util & paths
var gutil    = require('gulp-util'),
    path     = require('./paths.js'),
    // require for imagemin options
    pngquant = require('imagemin-pngquant');

// project local url
var url = 'gulp.dev';

// define options
module.exports = {

    // tasks names
    task: {
		browserSync: 'serve',
		fonts      : 'fonts',
		sass       : 'sass',
		scripts    : 'js',
		images     : 'images',
		bower      : 'bower',
		nunjucks   : 'nunjucks',
		clean      : 'clean',
		build      : 'build'
    },

    // serve task browser-sync options
    serve: {
        dev: {
            server: {
            	baseDir: path.to.dist.dev
            },
            // proxy: url + '/' + path.to.dev,
            // set browser automaically opened
            browser: 'google chrome'
            // for more options: http://www.browsersync.io/docs/options
        },
        prod: {
        	server: {
            	baseDir: path.to.dist.prod
            },
            // proxy: url + '/' + path.to.prod,
            // set browser automaically opened
            browser: 'google chrome'
        }
    },

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

    // nunjucks task options
    nunjucks: {
        // inject task options
        injectCss: {
            vendorOptions: {
                relative: true,
                name: 'vendor',
                // removeTags: true
                // more options : https://github.com/klei/gulp-inject#api
            },
            mainOptions: {
                relative: true,
                // removeTags: true
            }
        },
        injectJs: {
            options: {
                relative: true,
                // removeTags: true
            }
        }
    },

    // sass task options
    sass: {
        // main options
        options: {
            includePaths: [
                path.to.sass.vendor, 
                <% if (cssFramework === 'foundation-sites') { %>
                path.to.sass.foundation,
                <% } else if (cssFramework === 'bootstrap-v4.0.0-alpha') { %>
                path.to.sass.bootstrap,
                <% } else {} %>
                <% if (iconFonts.indexOf('fontAwesome') !== -1) { %>
                path.to.sass.fontAwesome
                <% } %>
            ],
            outputStyle: 'expanded'
            // more options
            // https://github.com/sass/node-sass#usage-1
        },
        // sass:doc options
        sassdocOptions: {
            dest: path.to.sass.dist.dev + '/_sassdoc',
            // for more options
            // http://sassdoc.com/gulp/
        }
    },

    // html task options
    html: {
        // build:html:copy prettify options
        prettifyOptions: {
            indent_size: 2,
            preserve_newlines: true
            // for more options: 
            // https://github.com/beautify-web/js-beautify#css--html
        },
        // build:html:inject options
        injectCss: {
            options: {
                relative: true,
                name: 'build',
                starttag: '<!-- build:css -->',
                endtag: '<!-- endbuild -->',
                removeTags: true
                // more options : https://github.com/klei/gulp-inject#api
            }
        },
        injectJs: {
            options: {
                relative: true,
                name: 'build',
                starttag: '<!-- build:js -->',
                endtag: '<!-- endbuild -->',
                removeTags: true
            }
        }
    },

    // css task options
    css: {
        // uncss options
        uncssOptions: {
            html: [path.to.dist.dev + '*.html'],
            // more options
            // https://github.com/giakki/uncss#within-nodejs
        },
        // strip-css-comments options
        stripCommentsOptions: {
            preserve: true
        },
        // cssbeautify options
        cssbeautifyOptions: {
            indent: '  '
        },
        // minify css options
        minifyCssOptions: {
            keepSpecialComments: 1
        },
        // rename options
        renameOptions: {
            suffix: '.min'
        }
    },

    // images task options
    images: {
        // imagemin options
        imageminOptions: {
            optimizationLevel: 7,
            progressive: true,
            interlaced: true,
            use: [pngquant()] // imagemin-pngquant
        },
        // favicons options
        faviconsOptions: {
            appName: 'Gulpfile Setup',
            appDescription: 'Gulpfile setup',
            developerName: 'mohamdio',
            developerURL: 'http://mohamd.io/',
            background: '#020307',
            path: 'assets/images/favicons/',
            url: '/',
            display: 'standalone',
            orientation: 'portrait',
            version: 1.0,
            logging: false,
            online: false,
            html: path.to.nunjucks.config + 'includes/favicons.nunjucks',
            replace: true,
            icons: {
                android: false, // create Android homescreen icon
                appleIcon: false, // create Apple touch icons
                appleStartup: false, // create Apple startup images
                coast: false, // create Opera Coast icon
                favicons: true, // create regular favicons
                firefox: false, // create Firefox OS icons
                opengraph: false, // create Facebook OpenGraph image
                twitter: false, // create Twitter Summary Card image
                windows: false, // create Windows 8 tile icons
                yandex: false // create Yandex browser icon
            }
            // options from here : https://github.com/haydenbleasel/favicons#nodejs
        }
    },

    // error handler
    error: function(error) {
        // output an error message
        gutil.log(
            gutil.colors.red(
                '\n\------------------------------\n\Error in plugin (' + gutil.colors.green(error.plugin) + '):\n\ ' + gutil.colors.blue(error.message) + '------------------------------'
            )
        );
        // emit the end event, to properly end the task
        this.emit('end');
    }
    
};