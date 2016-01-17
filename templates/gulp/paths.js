// gulp/paths.js
'use strict';

// base paths
var src    = './source/',
    dist   = './build/',
    dev    = 'dev/',
    prod   = 'prod/',
    assets = 'assets/';

// taks paths
module.exports = {
    to: {

    	// dest folders
        dist: {
            dev: dist + dev,
            prod: dist + prod,
            main: dist
        },
        dev: dev,
        prod: prod,

        // nunjucks files
        nunjucks: {
            config: src + 'templates/',
            src: src + 'templates/*.{html,nunjucks}',
            watch: src + 'templates/**/*.+(html|nunjucks)' // for watch task not render
        },

        // sass files
        sass: {
            src: [
                src + 'scss/**/*.{scss,sass}',
                '!' + src + 'scss/vendor/lib/**/*.{scss,sass}'
            ],
            vendor: src + 'scss/vendor/lib/',
            <% if (cssFramework === 'foundation-sites') { %>
            foundation: src + 'scss/vendor/lib/foundation-sites/scss',
            <% } else if (cssFramework === 'bootstrap-v4.0.0-alpha') { %>
            bootstrap: src + 'scss/vendor/lib/bootstrap/scss',
            <% } else {} %>
            <% if (iconFonts.indexOf('fontAwesome') !== -1) { %>
            fontAwesome: src + 'scss/vendor/lib/font-awesome/scss',
            <% } %>
            dist: {
                dev: dist + dev + assets + 'css',
                prod: dist + prod + assets + 'css'
            }
        },

        // js files
        js: {
            src: {
                main: src + 'js/main.js',
                copy: src + 'js/**/*.js'
            },
            vendor: src + 'js/vendor/',
            dist: {
                dev: dist + dev + assets + 'js',
                prod: dist + prod + assets + 'js'
            }
        },

        // images
        images: {
            src: src + 'images/**/*',
            logo: src + 'images/logo.png', // change it depend on logo name
            dist: {
                favicons: dist + dev + assets + 'images/favicons',
                dev: dist + dev + assets + 'images',
                prod: dist + prod + assets + 'images'
            }
        },

        // fonts
        fonts: {
            src: src + 'fonts/**/*',
            vendor: src + 'fonts/vendor/',
            dist: {
                dev: dist + dev + assets + 'fonts',
                prod: dist + prod + assets + 'fonts'
            }
        }
        
    }
};