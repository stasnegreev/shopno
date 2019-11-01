var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    spritesmith   = require('gulp.spritesmith'),
    browserSync   = require('browser-sync'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglifyjs'),
    cssnano       = require('gulp-cssnano'),
    rename        = require('gulp-rename'),
    del           = require('del'),
    imagemin      = require('gulp-imagemin'),
    ftp           = require('gulp-ftp'),
    babel         = require('gulp-babel'),
    rigger        = require('gulp-rigger');

//sync server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    });
});

// html builder
gulp.task('html:build', function () {
  gulp.src('app/html/*.html')
  .pipe(rigger())
  .pipe(gulp.dest('app'))
  .pipe(browserSync.reload({stream: true}));
});

//sass
gulp.task('sass', function () {
  return gulp.src('app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 15 versions','> 1%', 'ie 8', 'ie 7'],
        cascade: false
    }))
    .pipe(gulp.dest('app/css'));
});

//sprite
gulp.task('sprite', function () {
  var spriteData = gulp.src('app/img/icons/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest('app/css'));
});

//minify css
gulp.task('minify', ['sass', 'sprite'], function() {
	return gulp.src(['app/css/*.css','!app/css/*.min.css'])
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream:true}));
});

gulp.task('scripts:libs', function() {
  return gulp.src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
      'node_modules/@fortawesome/fontawesome-free/js/all.min.js',

    // 'bower_components/jquery/dist/jquery.min.js',
     'bower_components/bPopup/jquery.bpopup.min.js',
  	// 'bower_components/owl.carousel/dist/owl.carousel.min.js',
    // 'bower_components/wow/dist/wow.min.js',
    // 'bower_components/fancybox/dist/jquery.fancybox.min.js'
  	])
    .pipe(concat('libs.min.js'))
    .pipe(gulp.dest('app/js'));
});
gulp.task('scripts:min', function() {
  return gulp.src(['app/js/*.js','!app/js/*.min.js','!app/js/main.js'])
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/js'));
});
gulp.task('scripts', ['scripts:min', 'scripts:libs'], function() {
  return gulp.src('app/js/main.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify('main.min.js'))
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}));
});

//watch
gulp.task('watch', ['html:build', 'minify', 'scripts', 'browser-sync',], function () {
  gulp.watch('app/sass/**/*.scss', ['minify']);
  gulp.watch('app/**/*.html', ['html:build']);
  gulp.watch('app/img/icons/*.png', ['sprite']);
  gulp.watch('app/js/**/*.js', ['scripts']);
});

//build
gulp.task('build', ['image-sprite'], function () {
  return del.sync('dist/img/icons');
});
gulp.task('image-sprite', ['images'], function () {
  return gulp.src(['app/css/*.png'])
  .pipe(imagemin())
  .pipe(gulp.dest('dist/css'))
});
gulp.task('images', ['clean'], function () {
  return gulp.src(['app/img/**/*','!app/img/icons/**/*'])
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'))
});
gulp.task('clean', ['copy'], function () {
  return del.sync([
  'dist/sass',
  'dist/css/*.css',
  '!dist/css/*.min.css',
  'dist/css/sprite.min.css',
  'dist/js/*.js',
  '!dist/js/*.min.js',
  'dist/html',
  'dist/tpl'
  ]);
});
gulp.task('copy', ['clear'], function () {
  return gulp.src(['app/**/*', '!app/img/**/*'])
  .pipe(gulp.dest('dist'));
});
gulp.task('clear', ['html:build', 'minify', 'scripts'], function () {
	return del.sync('dist');
});

//upload on server
gulp.task('default', ['build'], function () {
	return gulp.src('dist/**/*')
	.pipe(ftp({
		host: '',
		user: '',
		pass: ''
	}));
});
