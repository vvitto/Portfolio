var gulp        = require("gulp");
var sass        = require("gulp-sass");
var pug         = require("gulp-pug");
var browserSync = require("browser-sync");
var imagemin    = require("gulp-imagemin");
var cache       = require("gulp-cache");
var del         = require("del");
var sequence    = require("run-sequence");
var cssnano     = require("gulp-cssnano");
var autoprefixer= require("gulp-autoprefixer");
gulp.task("sass", function(){
    return gulp.src("src/sass/main.sass")
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer(['last 15 versions', '> 1%', "ie 8", "ie 7"], {cascade: true}))
            .pipe(gulp.dest("src/css"))
            .pipe(browserSync.reload({stream: true}));
});

function onError(err) {
    console.log(err);
    this.emit('end');
  }

gulp.task("pug", function(){
    return gulp.src("src/pug/index.pug")
            .pipe(pug().on("error", onError))
            .pipe(gulp.dest("src/"))
            .pipe(browserSync.reload({stream: true}));
});


gulp.task("browserSync", function(){
    browserSync({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task("watch", ['browserSync', 'sass'], function(){
    gulp.watch("src/sass/**/*.sass", ["sass"]);
    gulp.watch("src/pug/**/*.pug", ['pug']);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});


gulp.task('image', function(){
	return gulp.src("src/assets/**/*.+(png|jpg|jpeg|svg|gif|ico)")
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}]
		})))
		.pipe(gulp.dest('dist/assets'));
});

gulp.task("fonts", function(){
    return gulp.src("src/css/fonts/**/*").pipe(gulp.dest("dist/css/fonts"));
});

gulp.task("clean", function(){
	return del.sync("dist");
});

gulp.task("build", ['clean', 'fonts','image', 'sass', 'pug'], function(){
    var buildHtml = gulp.src(['src/*.html'])
                    .pipe(gulp.dest("dist/"));

    var buildCss = gulp.src(['src/css/*.css',])
                    .pipe(cssnano())
                    .pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('src/assets/fonts/**/*')
		.pipe(gulp.dest("dist/assets/fonts"));

	var buildJs = gulp.src('src/js/**/*')
		.pipe(gulp.dest("dist/js"));
});
