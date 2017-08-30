var gulp = require('gulp'), 
	uglify = require( "gulp-uglify" ),//js文件压缩
	minifyCSS = require( "gulp-minify-css" );//css文件压缩
	
	gulp.task('uglify', function () {
		gulp.src('js/slider.js') 
			.pipe(uglify()) 
			.pipe(gulp.dest('src/js')); 
	});
	gulp.task('minifyCSS', function () {
		gulp.src('css/slider.css') 
			.pipe(minifyCSS()) 
			.pipe(gulp.dest('src/css')); 
	});
	 
	gulp.task('default',['uglify','minifyCSS']); 