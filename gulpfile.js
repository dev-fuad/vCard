var gulp = require('gulp');

var assetsDev = 'assets/';
var assetsProd = 'src/';

/* Mixed */
var ext_replace = require('gulp-ext-replace');
var run = require('run-sequence');
var ignore = require('gulp-ignore');

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

/* Clean-up */
var del = require('del');

function handleError(error) {
    console.log(error.toString());
    this.emit('end');
}


gulp.task('clean', function() {
  return del([assetsProd]);
});

gulp.task('build-css', function () {
    return gulp.src(assetsDev + 'scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', handleError)
        .pipe(autoprefixer())
        .pipe(cssnano({reduceIdents: false}))
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
        .pipe(ignore.exclude('_*'))
        .pipe(gulp.dest(assetsProd));
});

gulp.task('watch', function () {
    gulp.watch(assetsDev + 'scss/**/*.scss', ['build-css']);
    gulp.watch(assetsDev + 'scripts/*.js', ['build-js']);
    gulp.watch(assetsDev + 'img/*', ['build-img']);
    gulp.watch(assetsDev + 'jade/*.jade', ['build-html']);
    gulp.watch(assetsDev + 'library/**/*.*', ['get-vendor-files']);
});

var pathLibrary = assetsDev + 'library/**/*.*';

gulp.task('get-vendor-files', function() {
    return gulp.src(pathLibrary).pipe(gulp.dest(assetsProd + 'library/'));
});

gulp.task('default', ['get-vendor-files', 'build-css', 'build-js', 'build-html', 'build-img', 'watch']);

gulp.task('rebuild', function () {
    run('clean',
        ['get-vendor-files', 'build-js', 'build-css', 'build-img', 'build-html'],
        'watch');
});