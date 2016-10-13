const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');

const sass = require('gulp-sass');


const frontAppFile = './public/src/js/index.jsx';
const cssSassFile = './public/src/css/locals/index.scss';

const isProd = false;

let ENV = 'development';
let debug = true;

if (isProd) {
	ENV = 'production';
	debug = false;
}

process.env.NODE_ENV = ENV;

function handleError(err) {
	console.log(err);
}

function Build(compFileName) {
	return browserify({
		entries: compFileName,
		extensions: ['.js', '.jsx'],
		debug: debug
	})
		.transform('babelify', {
			presets: ['es2015', 'stage-3', 'react'],
			plugins: ['transform-object-rest-spread']
		})
		.transform('brfs')
		.bundle();
}

gulp.task('compile-front', () => {
	Build(frontAppFile)
		.on('error', handleError)
		.pipe(source('bundle.js'))
		.pipe(buffer())
		//.pipe(uglify())
		.pipe(gulp.dest('./public/dist/js'))
		.pipe(plumber());
});

gulp.task('watch-front', () => {
	gulp.watch(['./public/src/js/**/*.{js,jsx}'], ['compile-front']);
});

// SASS -> CSS
gulp.task('sass', function () {
	return gulp.src(cssSassFile)
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('./public/dist/css'));
});

gulp.task('watch-sass', function () {
	gulp.watch('./public/src/css/locals/*.scss', ['sass']);
});

// PROD TASK
gulp.task('compile-prod-front', () => {
	Build(frontAppFile)
		.on('error', handleError)
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('./public/dist/js'))
		.pipe(plumber());
});

gulp.task('compile', ['compile-prod-front', 'sass']);
gulp.task('default', ['watch-front', 'watch-sass']);
