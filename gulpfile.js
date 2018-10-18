'use strict';
const gulp = require('gulp'),
	sass = require('gulp-sass'),
	prefixer = require('gulp-autoprefixer'),
	cssmin = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rimraf = require('rimraf'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	watch = require('gulp-watch'),
	connect = require('gulp-connect'),
	pump = require('pump'),
	shell = require('gulp-shell'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync').create();

var path = {
	build: {
		htmlMain: 'build/',
		html: 'build/components/',
		jsMain: 'build/js/',
		js: 'build/components/',
		css: 'build/css/',
		cssmin: 'build/css/*.css',
		img: 'build/image',
		fonts: 'build/fonts/',
		cssPreview: 'src/css/'
	},
	src: {
		htmlMain: 'src/*.html',
		html: 'src/components/**/[^_]*.html',
		jsMain: 'src/js/**/*.js',
		js: 'src/components/**/[^_]*.js',
		jsminMain: 'src/js/*.js',
		jsmin: 'src/components/**/[^_]*.js',
		scss: 'src/scss/**/*.*',
		fonts: 'src/fonts/**/*.*',
		img: 'src/image/**/*.*'
	},
	watch: {
		html: 'src/components/**/*.html',
		htmlMain: 'src/**/*.html',
		jsMain: 'src/js/**/*.js',
		js: 'src/components/**/[^_]*.js',
		scss: 'src/scss/**/*.scss*',
		scssComponents: 'src/components/**/*.scss*',
		img: 'src/image/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	clean: './build',
	cleanSrcCss: './src/css',
	outputDir: './src'
};

gulp.task('serve', ['sass'], function() {
	browserSync.init({
		server: './src/'
	});

	gulp.watch('src/**/*.scss', ['sass', browserSync.reload]);
	gulp.watch('src/**/*.html').on('change', browserSync.reload);
});

gulp.task('sass-prefixer', function() {
	return gulp
		.src('src/scss/*.scss')
		.pipe(sass())
		.prefixer({
			browsers: ['last 2 versions']
		})
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.stream());
});

gulp.task('connect', function() {
	connect.server({
		root: [path.outputDir],
		port: 9999,
		livereload: true
	});
});

gulp.task('htmlMain:build', function() {
	pump([
		gulp.src(path.src.htmlMain),
		gulp.dest(path.build.htmlMain),
		connect.reload()
	]);
});

gulp.task('html:build', function() {
	pump([gulp.src(path.src.html), gulp.dest(path.build.html), connect.reload()]);
});

gulp.task('jsMain:build', function() {
	pump([gulp.src(path.src.jsMain), gulp.dest(path.build.jsMain)]);
});

gulp.task('js:build', function() {
	pump([gulp.src(path.src.js), gulp.dest(path.build.js)]);
});

gulp.task('image:build', function() {
	pump([gulp.src(path.src.img), gulp.dest(path.build.img)]);
});

gulp.task('css:build', function() {
	pump([
		gulp.src(path.src.scss),
		sass().on('error', sass.logError),
		gulp.dest(path.build.cssPreview),
		gulp.dest(path.build.css)
	]);
});

gulp.task('sass', function() {
	pump([
		gulp.src(path.src.scss),
		sass().on('error', sass.logError),
		prefixer({
			browsers: ['last 2 versions']
		}),
		gulp.dest(path.build.cssPreview),
		browserSync.stream()
	]);
});

gulp.task('cssmin', function() {
	pump([
		gulp.src(path.src.scss),
		sass().on('error', sass.logError),
		prefixer({
			browsers: ['last 2 versions']
		}),
		sourcemaps.init(),
		cssmin(),
		rename({ suffix: '.min' }),
		sourcemaps.write('.'),
		gulp.dest(path.build.css),
		gulp.dest(path.build.cssPreview)
	]);
});

gulp.task('fonts:build', function() {
	pump([gulp.src(path.src.fonts), gulp.dest(path.build.fonts)]);
});

gulp.task('jsminMain', function(cb) {
	pump(
		[
			gulp.src(path.src.jsMain),
			sourcemaps.init(),
			babel({
				presets: ['@babel/env']
			}),
			uglify(),
			rename({ suffix: '.min' }),
			sourcemaps.write('.'),
			gulp.dest(path.build.jsMain)
		],
		cb
	);
});

gulp.task('jsmin', function(cb) {
	pump(
		[
			gulp.src(path.src.js),
			sourcemaps.init(),
			babel({
				presets: ['@babel/env']
			}),
			uglify(),
			rename({ suffix: '.min' }),
			sourcemaps.write('.'),
			gulp.dest(path.build.js)
		],
		cb
	);
});

gulp.task('imgmin', function() {
	gulp
		.src(path.src.img)
		.pipe(
			imagemin(
				[
					imagemin.gifsicle({ interlaced: true }),
					imagemin.jpegtran({ progressive: true }),
					imagemin.optipng({ optimizationLevel: 7 }),
					imagemin.svgo({
						plugins: [{ removeViewBox: false }, { cleanupIDs: false }]
					})
				],
				{
					verbose: true
				}
			)
		)
		.pipe(gulp.dest(path.build.img));
});

gulp.task('build', [
	'html:build',
	'htmlMain:build',
	'js:build',
	'jsMain:build',
	'css:build',
	'fonts:build',
	'image:build'
]);

// watch
gulp.task('watch', ['connect'], function() {
	gulp.watch(path.watch.scss, ['css:build'], connect.reload());
	gulp.watch(path.watch.scssComponents, ['css:build'], connect.reload());
	gulp.watch(path.watch.html, connect.reload());
	gulp.watch(path.watch.htmlMain, connect.reload());
	gulp.watch(path.watch.js, connect.reload());
	gulp.watch(path.watch.jsMain, connect.reload());
});

// watch
gulp.task('sass-watch', ['cleanCss'], function() {
	gulp.watch(path.watch.scss, ['sass']);
	gulp.watch(path.watch.scssComponents, ['sass']);
});

gulp.task('watchOnly', ['build'], function() {
	gulp.watch(path.watch.scss, ['css:build']);
	gulp.watch(path.watch.scssComponents, ['css:build']);
	gulp.watch(path.watch.htmlMain, ['htmlMain:build']);
	gulp.watch(path.watch.html, ['html:build']);
	gulp.watch(path.watch.js, ['jsMain:build']);
	gulp.watch(path.watch.js, ['js:build']);
});

gulp.task('cleanCss', function(cb) {
	rimraf(path.cleanSrcCss, cb);
});

gulp.task('cleanCssMain', function(cb) {
	rimraf(path.build.css, cb);
});

gulp.task('clean', ['cleanCss'], function(cb) {
	rimraf(path.clean, cb);
});

gulp.task('min', ['cssmin', 'jsmin', 'jsminMain', 'imgmin']);

gulp.task('default', ['watch', 'connect']);
