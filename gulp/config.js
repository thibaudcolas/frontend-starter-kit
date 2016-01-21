var path = require('path');

var sourcePath = path.join('.', 'core', 'static_src');
var distPath = path.join('.', 'core', 'static');

var prod = process.env.NODE_ENV === 'production';


module.exports = {

    paths: {
        appName: 'site.js',
        sass: path.join(sourcePath, 'sass'),
        css: path.join(distPath, 'css'),
        jsSrc: path.join(sourcePath, 'js'),
        js: path.join(distPath, 'js'),
        svg: path.join(sourcePath, 'svg'),
        images: path.join(distPath, 'images'),
        slug: 'my-site',
        views: path.join('.', 'templates'),
    },

    PlzOptions: {
        minifier: prod,
        mqpacker: false,
        filters: false,
        rem: true,
        pseudoElements: true,
        opacity: true,
        autoprefixer: {
            browsers: ['> 1% in NZ', 'Explorer >= 8'],
        },
    },
};
