var gulp = require('gulp');

var assetsDev = 'assets/';
var assetsProd = 'src/';

/* Mixed */
var ext_replace = require('gulp-ext-replace');

/* HTML */
var jade = require('gulp-jade');

/* CSS */
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

/* JS */
var jsuglify = require('gulp-uglify');

/* Images */
var imagemin = require('gulp-imagemin');

function handleError(error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task('build-css', function () {
    return gulp.src(assetsDev + 'scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', handleError)
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(ext_replace('.min.css'))
        .pipe(gulp.dest(assetsProd + 'styles/'));
});

gulp.task('build-js', function () {
    return gulp.src(assetsDev + 'scripts/*.js')
        .pipe(sourcemaps.init())
        .pipe(jsuglify())
        .pipe(sourcemaps.write())
        .pipe(ext_replace('.min.js'))
        .pipe(gulp.dest(assetsProd + 'scripts/'));
});

gulp.task('build-img', function () {
    return gulp.src(assetsDev + 'img/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(assetsProd + 'img/'));
});

gulp.task('build-html', function () {
    return gulp.src(assetsDev + 'jade/*.jade')
        .pipe(jade())
        .on('error', handleError)
        .pipe(gulp.dest(assetsProd));
});

gulp.task('watch', function () {
    gulp.watch(assetsDev + 'scss/**/*.scss', ['build-css']);
    gulp.watch(assetsDev + 'scrpits/*.js', ['build-js']);
    gulp.watch(assetsDev + 'img/*', ['build-img']);
    gulp.watch(assetsDev + 'jade/*.jade', ['build-html']);
});

var paths = [
    'bower_components/bootstrap/dist/*/*.min.*',
    'bower_components/jquery/dist/jquery.min.js'
];

gulp.task('get-bootstrap', function() {
    return gulp.src(paths[0]).pipe(gulp.dest(assetsProd + 'bootstrap/'));
});

gulp.task('get-jquery', function() {
    return gulp.src(paths[1]).pipe(gulp.dest(assetsProd + 'jquery/'));
});

gulp.task('get-bower-components', ['get-bootstrap', 'get-jquery']);

gulp.task('default', ['get-bower-components', 'build-css', 'build-js', 'build-html', 'watch']);