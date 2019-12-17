var gulp = require('gulp');

var browserSync = require('browser-sync').create(); // live reload
var sass = require('gulp-sass'); //watch sass
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var autoprefixer = require('gulp-autoprefixer'); // в es5 и кросбраузерность
var sourcemaps = require('gulp-sourcemaps'); // исходные карты
var del = require('del'); // удаляет всё из нужной папки
var runSequence = require('run-sequence'); // Зависимости и последовательность выполнения
let source = require('vinyl-source-stream');
let browserify = require('browserify');

gulp.task('del', function () {
    return del('./build')
});

gulp.task('sass', function () {
   return gulp.src('./src/sass/**/*.scss')
       .pipe(plumber({
           errorHandler: function(err) {
               notify.onError({ // Обработка ошибок через gulp-notify
                   title: "Ошибка в CSS/SCSS",
                   message: "<%= error.message %>"
               })(err);
           }
       }))
       .pipe(sourcemaps.init())
       .pipe(sass().on('error', sass.logError))
       .pipe(autoprefixer({
           cascade: false
       }))
       .pipe(sourcemaps.write())
       .pipe(gulp.dest('./build/css'))
       .pipe(browserSync.stream())
});



gulp.task('html', function () { //copy html in build
    return gulp.src('./src/**/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream())
});
gulp.task('copy:img', function () { //copy img in build/img
    return gulp.src('src/img/**/*.{img,png,svg,gif}')
        .pipe(gulp.dest('./build/img'))
        .pipe(browserSync.stream())
});
// gulp.task('scripts', function () { //copy js in build/js
//     return gulp.src('src/js/**/*.js')
//         .pipe(browserify({
//             entries: './src/js/main.js',
//             debug: true,
//         }))
//
//         // .pipe(source("main.js"))
//         .pipe(gulp.dest('./build/js'))
//
// });
gulp.task('scripts', function() {
    return browserify({
        entries: './src/js/main.js',
        debug: true,
    })
        .on('error', function (error) {
            console.error(error.toString())
            this.emit('end')
        })
        .bundle()
        .on('error', function (error) {
            console.error(error.toString())
            this.emit('end')
        })
        .pipe(source("main.js"))
        .pipe(gulp.dest("./build/js"))
        .pipe(browserSync.stream())
});

gulp.task('server', function () {
    browserSync.init({
        server: {baseDir: './build/'}
    });
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.html', ['html' ]);
    gulp.watch('./src/js/**/*.js', ['scripts']);
    gulp.watch('./src/img/**/*.{img,png,svg,gif}', ['copy:img']);
});

gulp.task('dev', function (callback) {
    runSequence(
        'del',
        ['html', 'sass', 'scripts', 'copy:img'],
        'server',
        callback
    );
});
gulp.task('dev-not-watch', function (callback) {
    runSequence(
        'del',
        ['html', 'sass', 'scripts', 'copy:img'],
        callback
    );
});

// gulp.task('sass:watch', function () {
//     gulp.watch('./src/sass/**/*.scss', ['sass'])
// });