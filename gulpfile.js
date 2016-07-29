const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');

const debug = true;
const compFileName = 'index.jsx';
const ENV = 'development';

process.env.NODE_ENV = ENV;

function handleError(err) {
	console.log(err);
}

function Build() {
	return browserify({
		entries: `./src/js/${compFileName}`,
		extensions: ['.js', '.jsx'],
		debug
	})
		.transform('babelify', {presets: ['es2015', 'stage-3', 'react']})
		.transform('brfs')
		.bundle();
}

gulp.task('compile', () => {
	Build()
		.on('error', handleError)
		.pipe(source('bundle.js'))
		.pipe(buffer())
		//.pipe(uglify())
		.pipe(gulp.dest('./dist/js'))
		.pipe(plumber());
});

gulp.task('watch', () => {
	gulp.watch(['./src/**/*.js', './src/**/*.jsx'], ['compile']);
});

gulp.task('default', ['watch']);
