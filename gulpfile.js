var gulp = require("gulp");
var sass = require("gulp-sass");
var pug  = require("gulp-pug");
var browserSync = require("browser-sync");
var imagemin = require("gulp-imagemin");
var cache = require("gulp-cache");
var del = require("del");
var sequence = require("run-sequence");

gulp.task("sass", function(){
    return gulp.src("src/sass/main.sass")
            .pipe(sass().on('error', sass.logError))
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


gulp.task("image", function(){
    return gulp.src("assets/images/**/*.+(png|jpg|jpeg|svg)")
            .pipe(cache(imagemin()))
            .pipe(gulp.dest("src/assets/images"));
});

gulp.task("fonts", function(){
    return gulp.src("assets/fonts/**/*").pipe(gulp.dest("src/assets/fonts"));
});

gulp.task("clean:dist", function(callback){
    del(["dist/**/*", "!dist/images", "!dist/images/**/*"], callback);
});

gulp.task("clean", function(callback){
    del("dist");
    return cache.clearAll(callback);
});

gulp.task("build", function(callback){
    sequence("clean:dist", ['sass', 'pug', 'image', 'fonts'],  callback);
});