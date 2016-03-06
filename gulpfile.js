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

gulp.task('build-css', function () {
    return gulp.src(assetsDev + 'scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(ext_replace('.min.css'))
        .pipe(gulp.dest(assetsProd + 'styles/'));
});

gulp.task('build-js', function () {
    return gulp.src(assetsDev + 'scrpits/*.js')
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
        .pipe(gulp.dest(assetsProd));
});

gulp.task('watch', function () {
    gulp.watch(assetsDev + 'jade/*.jade', ['build-html']);
    gulp.watch(assetsDev + 'scrpits/*.js', ['build-js']);
    gulp.watch(assetsDev + 'scss/**/*.scss', ['build-css']);
    gulp.watch(assetsDev + 'img/*', ['build-img']);
});

gulp.task('default', ['watch', 'build-html', 'build-js', 'build-css']);