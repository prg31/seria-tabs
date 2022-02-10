const {
    src,
    dest
} = require('gulp');

module.exports = function copy_svg() {
    return src('./src/svg/*.svg')
        .pipe(dest('./build/svg/'))
}