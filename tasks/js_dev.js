const {
    src,
    dest
} = require('gulp');

const webpack = require('webpack-stream')

function js_user_dev() {
    return src('./src/js/user/ProductTabAttributes.js')
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'ProductTabAttributes.js'
            },
            watch: false,
            devtool: "source-map",
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: ['babel-loader'],
                    }
                ]
            }
        }))
        .pipe(dest('build/js/user'))
}
function js_manager_dev() {
    return src('./src/js/manager/editTabs.js')
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'editTabs.js'
            },
            watch: false,
            devtool: "source-map",
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: ['babel-loader'],
                    }
                ]
            }
        }))
        .pipe(dest('build/js/manager'))
}

exports.js_user_dev = js_user_dev;
exports.js_manager_dev = js_manager_dev;