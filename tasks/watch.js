const {
    watch,
    parallel,
} = require('gulp');

module.exports = function watching() {
    watch('src/**/*.scss', parallel('style_user_dev'));
    watch('src/js/user/*.js', parallel('js_user_dev'));
    watch('src/js/manager/*.js', parallel('js_manager_dev'));
}