const 	gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		styl           = require('gulp-stylus'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		autoprefixer   = require('gulp-autoprefixer'),
		notify         = require("gulp-notify"),
		smartgrid		= require('smart-grid');

// Сервер и автообновление страницы Browsersync
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
	});
});

// Минификация пользовательских скриптов проекта и JS библиотек в один файл
/*gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/js/common.js', // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});*/

gulp.task('styl', function() {
	return gulp.src('app/styl/**/*.styl')
	.pipe(styl({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({/*suffix: '.min',*/ prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	/*.pipe(cleanCSS())*/ // Опционально, закомментировать при отладке
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('grid', function(){
	smartgrid('app/styl', {
		outputStyle: 'styl',
		container: {
			maxWidth: '1920px'
		}
	});
});

gulp.task('watch', ['styl'/*, 'js'*/, 'browser-sync'], function() {
	gulp.watch('app/styl/**/*.styl', ['styl']);
	//gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/**/*.js', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);
