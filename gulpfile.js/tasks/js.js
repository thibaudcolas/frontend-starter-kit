const gulp = require('gulp');
const webpack = require('webpack');

const config = require('../config');
const webpackConfig = require(`../../webpack/webpack.config.${config.prod ? 'prod' : 'dev' }`);

gulp.task('js', (done) => {
    webpack(webpackConfig).run((err, stats) => {
        if (err) {
            console.error(err);

            if (err.details) {
                console.error(err.details);
            }
            return;
        }

        console.log(stats.toString(Object.assign({}, webpackConfig.stats, {
            timings: false,
        })));

        done();
    });
});
