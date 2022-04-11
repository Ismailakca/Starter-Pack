const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const browser = require('browser-sync').create()
const prefix = require('gulp-autoprefixer')
const uglfy = require('gulp-uglify')


gulp.task('css', () => {
    return gulp.src('src/assets/sass/main.scss')
    .pipe(sass({outputStyle:'compressed'}))
    .pipe(prefix())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browser.stream())
})

gulp.task('js', () => {
    return gulp.src('src/assets/js/*.js')
    .pipe(uglfy())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(browser.stream())
})

gulp.task('html', () => {
    return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browser.stream())
})

gulp.task('serve', () => {
    browser.init({
        server:{
            baseDir:['dist']
        }
    });
    gulp.watch('src/**/*.html',gulp.series(['html']))
    gulp.watch('src/assets/sass/**/*.scss',gulp.series(['css']))
    gulp.watch('src/assets/js/**/*.js',gulp.series(['js']))
})

gulp.task('default',gulp.series(['serve']))