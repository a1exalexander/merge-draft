'use strict';
const gulp = require('gulp'), //основной плагин gulp
    sass = require('gulp-sass'), //препроцессор sass
    prefixer = require('gulp-autoprefixer'), //расставление автопрефиксов
    cssmin = require('gulp-minify-css'), //минификация css
    uglify = require('gulp-uglify'), //минификация js
    imagemin = require('gulp-imagemin'), //минимизация изображений
    rimraf = require('rimraf'), //очистка
    sourcemaps = require('gulp-sourcemaps'), //sourcemaps
    rename = require('gulp-rename'), //переименвоание файлов
    plumber = require('gulp-plumber'), //предохранитель для остановки гальпа
    watch = require('gulp-watch'), //расширение возможностей watch
    connect = require('gulp-connect'), //livereload
    pump = require('pump'),
    shell = require('gulp-shell'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat');

var path = {
    build: {
        //Тут мы укажем куда складывать готовые после сборки файлы
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
        //Пути откуда брать исходники
        htmlMain: 'src/*.html', //Синтаксис src/template/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        html: 'src/components/**/[^_]*.html',
        jsMain: 'src/js/**/*.js', //В стилях и скриптах нам понадобятся только main файлы
        js: 'src/components/**/[^_]*.js',
        jsminMain: 'src/js/*.js',
        jsmin: 'src/components/**/[^_]*.js',
        scss: 'src/scss/**/*.*',
        fonts: 'src/fonts/**/*.*',
        img: 'src/image/**/*.*'
    },
    watch: {
        //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/components/**/*.html',
        htmlMain: 'src/**/*.html',
        jsMain: 'src/js/**/*.js',
        js: 'src/components/**/[^_]*.js',
        scss: 'src/**/*.scss*',
        scssComponents: 'src/components/**/*.scss*',
        img: 'src/image/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build', //директории которые могут очищаться
    cleanSrcCss: './src/css',
    outputDir: './src' //исходная корневая директория для запуска минисервера
};

gulp.task('connect', function() {
    connect.server({
        //настриваем конфиги сервера
        root: [path.outputDir], //корневая директория запуска сервера
        port: 9999, //какой порт будем использовать
        livereload: true //инициализируем работу LiveReload
    });
});

gulp.task('htmlMain:build', function() {
    pump([
        gulp.src(path.src.htmlMain), //Выберем файлы по нужному
        gulp.dest(path.build.htmlMain), //выгрузим их в папку build
        connect.reload() //И перезагрузим наш сервер для обновлений
    ]);
});

gulp.task('html:build', function() {
    pump([
        gulp.src(path.src.html), //Выберем файлы по нужному
        gulp.dest(path.build.html), //выгрузим их в папку build
        connect.reload() //И перезагрузим наш сервер для обновлений
    ]);
});

gulp.task('jsMain:build', function() {
    pump([
        gulp.src(path.src.jsMain), //Найдем наш main файл
        gulp.dest(path.build.jsMain) //выгрузим готовый файл в build
    ]);
});

gulp.task('js:build', function() {
    pump([
        gulp.src(path.src.js), //Найдем наш main файл
        gulp.dest(path.build.js) //выгрузим готовый файл в build
    ]);
});

gulp.task('image:build', function() {
    pump([
        gulp.src(path.src.img),
        gulp.dest(path.build.img) //выгрузим в build
    ]);
});

gulp.task('css:build', function() {
    pump([
        gulp.src(path.src.scss), //Выберем наш основной файл стилей
        sass().on('error', sass.logError), //Скомпилируем sass
        prefixer({
            browsers: ['last 2 versions']
        }), //Добавим вендорные префиксы
        gulp.dest(path.build.cssPreview), //вызгрузим в build
        gulp.dest(path.build.css)
    ]);
});

gulp.task('cssmin', function() {
    pump([
        gulp.src(path.src.scss), //Выберем наш основной файл стилей
        sass().on('error', sass.logError),
        prefixer({
            browsers: ['last 2 versions']
        }), //Добавим вендорные префиксы
        sourcemaps.init(), //инициализируем soucemap
        cssmin(), //Сожмем
        rename({ suffix: '.min' }), //добавим суффикс .min к имени выходного файла
        sourcemaps.write('.'), //пропишем sourcemap
        gulp.dest(path.build.css), //вызгрузим в build
        gulp.dest(path.build.cssPreview)
    ]);
});

gulp.task('fonts:build', function() {
    pump([
        gulp.src(path.src.fonts),
        gulp.dest(path.build.fonts) //выгружаем в build
    ]);
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
    gulp.src(path.src.img)
        .pipe(
            imagemin(
                [
                    imagemin.gifsicle({ interlaced: true }),
                    imagemin.jpegtran({ progressive: true }),
                    imagemin.optipng({ optimizationLevel: 7 }),
                    imagemin.svgo({
                        plugins: [
                            { removeViewBox: false },
                            { cleanupIDs: false }
                        ]
                    })
                ],
                {
                    verbose: true
                }
            )
        )
        .pipe(gulp.dest(path.build.img)); //выгрузим в build
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
    gulp.watch(path.watch.html, connect.reload()); // Наблюдение за HTML файлами в корне проекта
    gulp.watch(path.watch.htmlMain, connect.reload());
    gulp.watch(path.watch.js, connect.reload()); // Наблюдение за JS файлами в папке js
    gulp.watch(path.watch.jsMain, connect.reload());
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
