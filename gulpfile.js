/**
 * @method gulpfile 打包工具
 * @author Lkx
 * @create time 2018.05.31
 */

let pkg = require('./package.json');
let gulp = require('gulp');
let browserSync = require('browser-sync').create();
let runSequence = require('run-sequence');
let header = require('gulp-header');
let note = '/**\n * method ' + pkg.name + '\n * version ' + pkg.version + '\n * author Lkx\n * create time ' + pkg.createTime + '\n * update time ' + pkg.updateTime + '\n * website http://www.kxui.org\n */\n\n'
let cssPath = './src/css/scss/*.scss';
let jsPath = ['./src/*.js', './src/modules/*.js'];

/**
 * @method build 开发构建入口
 * @for gulpfile
 */
gulp.task('build', function () {
  runSequence(['clean'], ['revScss'], ['revCss'], ['revJs']);
});

/**
 * @method dev 本地服务启动入口
 * @for gulpfile
 */
gulp.task('dev', function () {
  runSequence(['watch'], ['server']);
});

/**
 * @method clean 打包前进行文件清理
 * @for build
 */
let del = require('del');
gulp.task('clean', function (cb) {
  return del([
    './dist/*',
    './src/css/*.css'
  ], cb);
});

/**
 * @method revScss scss代码编译
 * @for build/watch
 */
let sass = require('gulp-sass');
gulp.task('revScss', function () {
  return gulp.src(cssPath)
    .pipe(sass())
    .pipe(header(note))
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

/**
 * @method revCss css兼容性处理及压缩打包
 * @for build/watch
 */
let cssMin = require('gulp-csso');
let autoprefixer = require('gulp-autoprefixer');
gulp.task('revCss', function () {
  return gulp.src('./src/css/kxui.css', {
      base: './src'
    })
    .pipe(autoprefixer())
    .pipe(cssMin())
    .pipe(header(note))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

/**
 * @method revCss javascript代码压缩
 * @for build/watch
 */
let uglify = require('gulp-uglify');
let babel = require("gulp-babel");
gulp.task('revJs', function () {
  return gulp.src(jsPath, {
      base: './src'
    })
    .pipe(babel())
    .pipe(uglify())
    .pipe(header(note))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

/**
 * @method revCss 监听开发文件
 * @for dev
 */
gulp.task('watch', ['dev'], function () {
  gulp.watch(cssPath, ['revScss']);
  gulp.watch('./src/css/compile/popup.css', ['revCss']);
  gulp.watch(jsPath, ['revJs']);
});

/**
 * @method server 启动服务器
 * @for dev
 */
gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: './src',
      index: './../test/test.html'
    },
    port: 8000
  })
});