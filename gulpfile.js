var gulp = require('gulp'),
	postcss = require('gulp-postcss'),
	cssnext = require('cssnext'),
	precss = require ('precss'),
	sass = require('gulp-sass'),
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync').create();

	var paths = {
		vendor: ['node_modules/jquery/dist/jquery.js', 'node_modules/featherlight/release/featherlight.min.js', 'node_modules/gsap/src/minified/TweenMax.min.js', 'node_modules/gsap/src/minified/TimelineMax.min.js', 'node_modules/gsap/src/minified/plugins/CSSPlugin.min.js' ],
		scripts: ['js/*.js'],
		pages: ['pages/**/*.html'],
		scss: ['scss/*.scss', 'node_modules/featherlight/release/featherlight.min.css'],
		images: ['img/**/*']
	};

gulp.task('server', ['css', 'js', 'pages', 'images', 'vendorsJS'], function(){
	browserSync.init({
		server:  "dist/"
	});
});	

gulp.task('pages', function(){
	return gulp.src(paths.pages)
	.pipe(gulp.dest('dist/'));
});

gulp.task('images', function(){
	return gulp.src(paths.images)
	.pipe(gulp.dest('dist/img/'));
});

const sassPaths = [
	'./node_modules/foundation-sites/scss',
	'scss/settings'
];

gulp.task('css', function () {
  var processors = [
        autoprefixer({
        			browsers: ['last 2 versions', 'ie >= 9', 'android >= 4.4', 'ios >= 7'
							]}),
				cssnano,
				require('postcss-font-magician')({})
    ];
	return gulp.src('./scss/*.scss')
		.pipe(sass({includePaths: sassPaths}).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist/css'));
});


gulp.task('js', function(){
	return gulp.src(paths.scripts)
	.pipe(browserSync.stream())
	.pipe(concat('app.js'))
	.pipe(gulp.dest('dist/js/'));
});

gulp.task('vendorsJS', function(){
	return gulp.src(paths.vendor)
	.pipe(concat('vendors.min.js'))
	.pipe(gulp.dest('dist/js/'));
});


// WATCHERS
gulp.task('watch', function() {
	gulp.watch('scss/**/*.scss', ['css']).on('change', browserSync.reload, function(event) { console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
	gulp.watch('js/**/*.js', ['js']).on('change', browserSync.reload, function(event) {
				console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
	gulp.watch('pages/**/*.html', ['pages']).on('change', browserSync.reload, function(event) { console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
	gulp.watch('images/**/*', ['images']).on('change', browserSync.reload, function(event) {
				console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['pages', 'images', 'css', 'vendorsJS', 'js', 'watch', 'server'])
