const gulp = require('gulp');
const requireDir = require('require-dir');
const tasks = requireDir('./tasks');

exports.style_user_dev = tasks.style_dev.style_user_dev;
exports.style_manager_dev = tasks.style_dev.style_manager_dev;
exports.style_user_prod = tasks.style_prod.style_user_prod;
exports.style_manager_prod = tasks.style_prod.style_manager_prod;

exports.js_user_dev = tasks.js_dev.js_user_dev;
exports.js_manager_dev = tasks.js_dev.js_manager_dev;

exports.copy_svg = tasks.copy_svg;
exports.watch = tasks.watch;

exports.default = gulp.parallel(
    exports.style_user_dev,
    exports.style_manager_dev,
    exports.js_user_dev,
    exports.js_manager_dev,
    exports.copy_svg,
    exports.watch,
);

exports.prod = gulp.parallel(
    exports.style_user_prod,
    exports.style_manager_prod,
    exports.js_user_dev,
    exports.js_manager_dev,
    exports.copy_svg,
);