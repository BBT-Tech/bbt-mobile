var gulp = require('gulp');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var reload  = browserSync.reload;
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var header = require('gulp-header');
var sourcemaps = require('gulp-sourcemaps');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var pkg = require('./package.json');

var banner = ['/**', '* BBT Mobile CSS Library', '* Author: ruansongsong', '* Version: <%= pkg.version %> ', '* License: MIT', '*/'].join('\n');
gulp.task('less', function() {
	gulp.src('./src/style/bbt-mobile.less')
	.pipe(sourcemaps.init())
	.pipe(less())
	.pipe(postcss([autoprefixer(['ios >= 7', 'android >= 4.1'])]))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./dist/style/'))
	.pipe(browserSync.reload({stream: true}))
	.pipe(cssnano())
	.pipe(header(banner, {
		pkg: pkg
	}))
	.pipe(rename(function(path) {
		path.basename += '.min';
	}))
	.pipe(gulp.dest('./dist/style/'))

});
// gulp.task('js', function() {
// 		gulp.src('./src/js/*.js')
// 		.pipe(concat('bbt-mobile.js'))
// 		.pipe(gulp.dest('./dist/js/'))
// 		.pipe(rename(function(path) {
// 			path.basename += '.min';
// 		}))
// 		.pipe(uglify())    //压缩
// 		.pipe(gulp.dest('./dist/js/'));  //输出
// });
gulp.task('watch', function() {
    gulp.watch('./src/style/**/*', ['less']);
		gulp.watch('./src/js/**/*', ['js']);
    gulp.watch("./dist/example/*.html").on('change', reload);
});
gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: './dist/'
		},
		startPath: '/'
	});
});
gulp.task('test', function () {
	gulp.start('server');
	gulp.start('watch');
});
